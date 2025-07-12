
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");

if (!process.env.JWT_SECRET) {
    console.error("Error: JWT_SECRET is not defined in environment variables.");
    process.exit(1);
}
// **ข้อควรระวัง: ใน Production ควรเก็บ loginStates ใน Redis หรือ Database เช่นกัน ไม่ควรเก็บในหน่วยความจำ**
const loginStates = new Map();

exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }
    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }
    if (!['user', 'admin'].includes(role.toLowerCase())) {
        return res.status(400).json({ msg: "Invalid role. Role must be 'user' or 'admin'." });
    }

    try {
        const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed successfully:', hashedPassword);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role.toLowerCase()]
        );

        console.log(`New user registered (in database): ID: ${result.insertId}, Email: ${email}`);

        res.status(201).json({
            success: true,
            msg: "User registered successfully",
            userId: result.insertId,
            email: email,
            role: role.toLowerCase()
        });
    } catch (err) {
        console.error('Error during user registration:', err.message);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ msg: "Email already exists." });
        }
        res.status(500).send("Server error during registration");
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    try {
        const [users] = await pool.query('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            const currentState = loginStates.get(email) || {
                count: 0,
                lockUntil: null,
                isPermanentlyLocked: false,
            };
            currentState.count++;

            // ตรรกะการล็อกที่ไม่พบผู้ใช้
            if (currentState.count >= 9) {
                currentState.isPermanentlyLocked = true;
                currentState.lockUntil = null;
                console.warn(`Non-existent email '${email}' permanently locked.`);
            } else if (currentState.count >= 3) {
                currentState.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // ล็อก 2 นาที
                console.warn(`Non-existent email '${email}' temporarily locked for 2 minutes.`);
            }
            loginStates.set(email, currentState);

            return res.status(400).json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
        }

        let userLoginState = loginStates.get(user.email);

        if (!userLoginState) {
            userLoginState = {
                count: 0,
                lockUntil: null,
                isPermanentlyLocked: false,
            };
            loginStates.set(user.email, userLoginState);
        }

        if (userLoginState.isPermanentlyLocked) {
            return res.status(403).json({
                msg: "บัญชีของคุณถูกล็อกถาวรเนื่องจากพยายามเข้าสู่ระบบผิดพลาดหลายครั้ง กรุณาติดต่อผู้ดูแลระบบ",
                typeLoacked: "permanently",
            });
        }

        if (userLoginState.lockUntil && userLoginState.lockUntil > new Date()) {
            const minutesRemaining = Math.ceil(
                (userLoginState.lockUntil.getTime() - new Date().getTime()) / (1000 * 60)
            );
            return res.status(429).json({
                msg: `พยายามเข้าสู่ระบบผิดพลาดหลายครั้ง กรุณาลองใหม่ในอีก ${minutesRemaining} นาที`,
                typeLoacked: "temporary",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            userLoginState.count++;

            // ตรรกะการล็อกสำหรับรหัสผ่านผิด
            if (userLoginState.count >= 4) {
                userLoginState.isPermanentlyLocked = true;
                userLoginState.lockUntil = null;
                loginStates.set(user.email, userLoginState);
                console.warn(`User '${user.email}' permanently locked due to incorrect password attempts.`);
                return res.status(403).json({
                    msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง บัญชีของคุณถูกล็อกถาวรเนื่องจากพยายามเข้าสู่ระบบผิดพลาดหลายครั้ง",
                    typeLoacked: "permanently",
                });
            } else if (userLoginState.count >= 3) {
                userLoginState.lockUntil = new Date(Date.now() + 2 * 60 * 1000);
                loginStates.set(user.email, userLoginState);
                console.warn(`User '${user.email}' temporarily locked for 2 minutes.`);
                return res.status(429).json({
                    msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง พยายามเข้าสู่ระบบผิดพลาดหลายครั้ง บัญชีของคุณถูกล็อกชั่วคราว 2 นาที",
                    typeLoacked: "temporary",
                });
            }

            loginStates.set(user.email, userLoginState);
            return res.status(400).json({ msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
        }

        userLoginState.count = 0;
        userLoginState.lockUntil = null;
        userLoginState.isPermanentlyLocked = false;
        loginStates.set(user.email, userLoginState);

        const payload = {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "3m" },
            (err, token) => {
                if (err) throw err;
                res.json({ token, msg: "เข้าสู่ระบบสำเร็จ" });
            }
        );
    } catch (err) {
        console.error('Error during user login:', err.message);
        res.status(500).send("เกิดข้อผิดพลาดที่เซิร์ฟเวอร์");
    }
};

exports.getAuthUser = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
        const currentUser = users[0];
        console.log('Authenticated user:', currentUser);

        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(currentUser);
    } catch (err) {
        console.error('Error getting authenticated user:', err.message);
        res.status(500).send("Server Error");
    }
};
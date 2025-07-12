const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [
  {
    "id": 1,
    "name": "Admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$duw8gRPCSQYKNC3K.VNC1eGo62Xpk7l5uR7K6zfOpnV3sLVlh/3xO", // hashed password for "123456"
    "role": "admin"
  }
];

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(
      'password hashed successfully:', hashedPassword
    );

    const newUserId =
      (users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0) + 1;

    // 4. สร้าง object ผู้ใช้และเก็บใน In-Memory Store
    const newUser = {
      id: newUserId,
      name,
      email,
      password: hashedPassword,
      role: role,
    };
    users.push(newUser);
    console.log(
      `New user registered (in-memory): ID: ${newUser.id}, Email: ${newUser.email}`
    );

    res.json({
      success: true,
      msg: "User registered in successfully (In-Memory)",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const loginStates = new Map();

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const user = users.find((u) => u.email === email);

    if (!user) {
      // อัปเดตสถานะการล็อกอินสำหรับอีเมลที่ไม่มีอยู่จริง
      const currentState = loginStates.get(email) || {
        count: 0,
        lockUntil: null,
        isPermanentlyLocked: false,
      };
      currentState.count++;

      if (currentState.count >= 9) {
        currentState.isPermanentlyLocked = true;
        currentState.lockUntil = null;
      } else if (currentState.count >= 3) {
        currentState.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // ล็อก 2 นาที
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
        (userLoginState.lockUntil.getTime() - new Date().getTime()) /
          (1000 * 60)
      );
      return res.status(429).json({
        msg: `พยายามเข้าสู่ระบบผิดพลาดหลายครั้ง กรุณาลองใหม่ในอีก ${minutesRemaining} นาที`,
        typeLoacked: "temporary",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      userLoginState.count++;

      if (userLoginState.count >= 4) {
        userLoginState.isPermanentlyLocked = true;
        userLoginState.lockUntil = null;
        loginStates.set(user.email, userLoginState);
        return res.status(403).json({
          msg: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง บัญชีของคุณถูกล็อกถาวรเนื่องจากพยายามเข้าสู่ระบบผิดพลาดหลายครั้ง",
          typeLoacked: "permanently",
        });
      } else if (userLoginState.count >= 3) {
        userLoginState.lockUntil = new Date(Date.now() + 2 * 60 * 1000);
        loginStates.set(user.email, userLoginState);
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
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: "เข้าสู่ระบบสำเร็จ (ในหน่วยความจำ)" });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("เกิดข้อผิดพลาดที่เซิร์ฟเวอร์");
  }
};

exports.getAuthUser = (req, res) => {
  try {
    // ข้อมูลผู้ใช้ (req.user) มาจาก authMiddleware ที่ถอดรหัส JWT ให้เรา
    // req.user จะมี id และ email ของผู้ใช้ที่ Login เข้ามา
    const currentUser = users.find((u) => u.id === req.user.id);
    if (!currentUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { password, ...userWithoutPassword } = currentUser;
    res.json(userWithoutPassword); // ส่งข้อมูลผู้ใช้ (ยกเว้นรหัสผ่าน) กลับไป
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

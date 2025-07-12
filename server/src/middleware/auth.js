const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. ดึงค่าเต็มของ Authorization Header
    const authHeader = req.header('Authorization'); // ตอนนี้ค่าจะเป็น "Bearer eyJhbGciO..."

    // 2. ตรวจสอบว่ามี Authorization Header ไหม
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. แยก Bearer ออกจาก Token จริงๆ
    // ค่าใน authHeader จะเป็น "Bearer <YOUR_TOKEN>"
    // เราต้องการแค่ <YOUR_TOKEN>
    const token = authHeader.split(' ')[1]; // แยก string ด้วยช่องว่าง และเอาส่วนที่สอง (index 1)

    // 4. ตรวจสอบว่ามี Token หลังจากแยกแล้วไหม (ป้องกันกรณี Header เป็นแค่ "Bearer" เฉยๆ)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 5. ตรวจสอบความถูกต้องของ Token
    try {
        // ใช้ JWT_SECRET (จาก .env) เพื่อถอดรหัส Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // เมื่อถอดรหัสสำเร็จ ข้อมูลที่เราใส่ไว้ใน Token (payload) จะอยู่ใน decoded.user
        req.user = decoded.user;
        next(); // เรียก next() เพื่อส่ง request ไปยังฟังก์ชันถัดไปใน pipeline (เช่น Controller)
    } catch (err) {
        // หาก Token ไม่ถูกต้อง, หมดอายุ, หรือถูกแก้ไข
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
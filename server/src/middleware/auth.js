const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. ดึง Token จาก HTTP Header
    // โดยทั่วไป Client จะส่ง JWT มาใน Header ที่ชื่อ 'x-auth-token'
    const token = req.header('x-auth-token');

    // 2. ตรวจสอบว่ามี Token ไหม
    if (!token) {
        // ถ้าไม่มี Token แปลว่าไม่ได้รับอนุญาตให้เข้าถึง
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. ตรวจสอบความถูกต้องของ Token
    try {
        // ใช้ JWT_SECRET (จาก .env) เพื่อถอดรหัส Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // เมื่อถอดรหัสสำเร็จ ข้อมูลที่เราใส่ไว้ใน Token (payload) จะอยู่ใน decoded.user
        // เราจะแนบข้อมูลผู้ใช้นี้ไปกับ object 'req' เพื่อให้ Route หรือ Controller ถัดไปใช้งานได้
        req.user = decoded.user;
        next(); // เรียก next() เพื่อส่ง request ไปยังฟังก์ชันถัดไปใน pipeline (เช่น Controller)
    } catch (err) {
        // หาก Token ไม่ถูกต้อง, หมดอายุ, หรือถูกแก้ไข
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
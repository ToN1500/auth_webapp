# Backend - Node.js (Express)

โฟลเดอร์นี้เป็นส่วนของ Backend พัฒนาโดยใช้ Node.js และ Express

## โครงสร้างหลัก

- `src/app.js` — Entry point ของแอป
- `src/controllers/` — จัดการ logic ของแต่ละ route (authController.js)
- `src/routes/api/` — กำหนด API routes (auth.js)
- `src/middleware/` — Middleware ต่าง ๆ (auth.js)
- `src/db.js` — การเชื่อมต่อฐานข้อมูล

## คำสั่งที่ใช้บ่อย

- ติดตั้ง dependencies: `npm install`
- รันเซิร์ฟเวอร์: `npm start`
- รัน dev (ถ้ามี nodemon): `npm run dev`

## ฟีเจอร์หลัก

- REST API สำหรับ authentication (register, login, logout)
- Middleware สำหรับตรวจสอบ token
- จัดการ session/user data

## การตั้งค่าเพิ่มเติม

- สามารถปรับแต่ง environment variables ได้ในไฟล์ `.env` (ถ้ามี)

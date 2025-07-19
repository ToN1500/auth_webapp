# Frontend - React + Vite

โฟลเดอร์นี้เป็นส่วนของ Frontend พัฒนาโดยใช้ React (Vite)

## โครงสร้างหลัก

- `src/` — โค้ดหลักของแอป
  - `components/` — ส่วนประกอบ UI ทั่วไป (Navbar, Footer, Button, ProtectedRoute)
  - `features/auth/` — ฟีเจอร์เกี่ยวกับ authentication (Login, Register, authSlice)
  - `features/data/` — ฟีเจอร์เกี่ยวกับข้อมูลผู้ใช้
  - `pages/` — หน้าเพจหลัก (HomePage)
  - `app/store.js` — Redux store
- `public/` — ไฟล์ static

## คำสั่งที่ใช้บ่อย

- ติดตั้ง dependencies: `npm install`
- รัน dev server: `npm run dev`
- Build production: `npm run build`
- ตรวจสอบ lint: `npm run lint`

## การตั้งค่าเพิ่มเติม

- สามารถปรับแต่ง ESLint ได้ที่ `eslint.config.js`
- ตั้งค่า Vite ได้ที่ `vite.config.js`

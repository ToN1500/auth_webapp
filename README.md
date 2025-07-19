# Auth WebApp

โปรเจกต์นี้เป็นระบบ Authentication Web Application ที่พัฒนาโดยใช้ React (Vite) สำหรับฝั่ง Client และ Node.js (Express) สำหรับฝั่ง Server

## โครงสร้างโปรเจกต์

```
auth_webapp/
  ├── client/    # Frontend - React (Vite)
  └── server/    # Backend - Node.js (Express)
```

## การเริ่มต้นใช้งาน

### 1. ติดตั้ง dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 2. รันโปรเจกต์

- ฝั่ง Client

  ```bash
  cd client
  npm run dev
  ```

- ฝั่ง Server

  ```bash
  cd server
  npm start
  ```

## ฟีเจอร์หลัก

- ระบบสมัครสมาชิก / ล็อกอิน / ล็อกเอาท์
- ป้องกัน route ที่ต้องการ authentication
- จัดการข้อมูลผู้ใช้

## โฟลเดอร์ย่อย

- [client/README.md](./client/README.md) — คู่มือฝั่ง Frontend
- [server/README.md](./server/README.md) — คู่มือฝั่ง Backend

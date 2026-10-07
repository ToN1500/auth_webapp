# Auth WebApp

ระบบยืนยันตัวตนและการจัดการสิทธิ์ผู้ใช้งาน (Authentication & Role-Based Access Control) พัฒนาแบบ Fullstack ด้วย **React 19 (Vite)**, **Node.js (Express 5)**, **MySQL 8.0** และควบคุมการทำงานด้วย **Docker Compose**

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Redux Toolkit, React Router v7
- **Backend:** Node.js, Express 5, JSON Web Token (JWT), bcryptjs
- **Database:** MySQL 8.0
- **DevOps:** Docker, Docker Compose

---

## การเริ่มต้นใช้งาน (Quick Start with Docker)

วิธีที่แนะนำที่สุดสำหรับเปิดทดสอบระบบ โดยไม่ต้องติดตั้ง MySQL หรือ Node.js บนเครื่องโฮสต์:

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/<your-username>/auth_webapp.git
cd auth_webapp
```

### 2. รันระบบด้วย Docker Compose

```bash
docker compose up -d
```

> **หมายเหตุ:** ในการรันครั้งแรก ระบบจะทำการ Build Image และรันสคริปต์สร้างตารางฐานข้อมูลพร้อมข้อมูลทดสอบเริ่มต้นให้อัตโนมัติผ่าน `server/init.sql`

### 3. เข้าใช้งานระบบ

- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## ข้อมูลบัญชีสำหรับทดสอบ (Demo Account)

ระบบได้เตรียมบัญชีผู้ใช้เริ่มต้นไว้ให้พร้อมใช้งานทันที:

| Attribute | ค่าเริ่มต้น |
| :--- | :--- |
| **Email** | `admin@gmail.com` |
| **Password** | `123456` |
| **Role** | `admin` |

---

## คำสั่งควบคุม Docker ที่เป็นประโยชน์

- **ดูสถานะการทำงาน:**
  ```bash
  docker compose ps
  ```
- **ดูบันทึกการทำงาน (Logs):**
  ```bash
  docker compose logs -f
  ```
- **หยุดการทำงาน:**
  ```bash
  docker compose down
  ```
- **หยุดการทำงานและล้างข้อมูลฐานข้อมูลทั้งหมด (Reset DB):**
  ```bash
  docker compose down -v
  ```

---

## การรันแบบ Local (ทางเลือกเสริมโดยไม่ใช้ Docker)

หากต้องการรันบนเครื่องโดยตรง:

1. **ตั้งค่าฐานข้อมูล MySQL บนเครื่องของคุณ:**
   - นำไฟล์ `server/init.sql` ไป Execute ในฐานข้อมูลชื่อ `auth_webapp`
2. **ติดตั้งและรันฝั่ง Server:**
   ```bash
   cd server
   npm install
   # คัดลอก .env.example เป็น .env แล้วตั้งค่าการเชื่อมต่อ MySQL
   npm start
   ```
3. **ติดตั้งและรันฝั่ง Client:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## โครงสร้างโปรเจกต์

```text
auth_webapp/
├── client/                 # Frontend - React (Vite)
│   ├── Dockerfile
│   ├── .dockerignore
│   └── src/
├── server/                 # Backend - Node.js (Express)
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── init.sql            # สคริปต์สร้างตารางและข้อมูลตั้งต้น
│   └── src/
├── docker-compose.yml      # ไฟล์ควบคุม Multi-container (db, server, client)
└── README.md
```

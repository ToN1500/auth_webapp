CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- บัญชีผู้ใช้เริ่มต้นสำหรับทดสอบระบบ (รหัสผ่าน: 123456)
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@gmail.com', '$2b$10$eNgAlV6b6dtJnbU/5HkGnOAYSkB.UVIV/3Dpm38ZpPtPspzPzWFRy', 'admin')
ON DUPLICATE KEY UPDATE id=id;

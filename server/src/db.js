// db.js
const mysql = require('mysql2/promise');

// ตั้งค่าการเชื่อมต่อฐานข้อมูล MySQL
// **ข้อควรระวัง: ใน Production ควรเก็บค่าเหล่านี้ใน Environment Variables**
const dbConfig = {
    host: process.env.DB_HOST,      
    port: process.env.DB_PORT,
    user: process.env.DB_USER,           
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    waitForConnections: true, 
    connectionLimit: 10,     
    queueLimit: 0            
};

// สร้าง connection pool
const pool = mysql.createPool(dbConfig);

pool.getConnection()
    .then(connection => {
        console.log('Successfully connected to MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL pool:', err.stack);
        // หากเชื่อมต่อไม่ได้ อาจจะต้องพิจารณาหยุดแอปพลิเคชัน
        process.exit(1);
    });

// ส่งออก pool object เพื่อให้ไฟล์อื่นสามารถนำไปใช้ได้
module.exports = pool;
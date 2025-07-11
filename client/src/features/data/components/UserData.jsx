import { useEffect, useState } from 'react';

function UserData() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // 1. ดึง Token จาก Local Storage
      const token = localStorage.getItem('token');

      // ตรวจสอบว่ามี Token หรือไม่
      if (!token) {
        setError("คุณยังไม่ได้ล็อกอิน");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 2. แนบ Token เข้าไปใน Authorization Header
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          // ถ้า Server ตอบกลับมาว่า Token ไม่ถูกต้อง/หมดอายุ
          if (response.status === 401 || response.status === 403) {
            setError("เซสชันหมดอายุหรือคุณไม่ได้รับอนุญาต กรุณาเข้าสู่ระบบใหม่");
            localStorage.removeItem('token'); // ลบ Token ที่หมดอายุทิ้ง
            // อาจจะ navigate ไปหน้า login อีกครั้ง
            // navigate('/login');
          } else {
            setError(`เกิดข้อผิดพลาด: ${response.statusText}`);
          }
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("ไม่สามารถดึงข้อมูลโปรไฟล์ได้");
      }
    };

    fetchProfile();
  }, []); // [] หมายถึงเรียกใช้ครั้งเดียวเมื่อ component ถูก mount

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!profile) {
    return <div className="p-4">กำลังโหลดข้อมูลโปรไฟล์...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">ข้อมูลโปรไฟล์</h2>
      <p>ชื่อ: {profile.name}</p>
      <p>อีเมล: {profile.email}</p>
      {/* แสดงข้อมูลโปรไฟล์อื่นๆ */}
    </div>
  );
}

export default UserData;
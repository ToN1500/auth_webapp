import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8 shadow-inner">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* คอลัมน์ 1: เกี่ยวกับเรา */}
          <div>
            <h3 className="text-lg font-semibold mb-2">เกี่ยวกับเรา</h3>
            <p className="text-gray-400 text-sm">
              เว็บไซต์นี้เป็นตัวอย่างการใช้งาน React และ Tailwind CSS
              เพื่อสร้างส่วนประกอบพื้นฐานของหน้าเว็บ
            </p>
          </div>

          {/* คอลัมน์ 2: ลิงก์ด่วน */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ลิงก์ด่วน</h3>
            <ul className="space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">หน้าหลัก</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">บริการ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>

          {/* คอลัมน์ 3: ติดต่อเรา */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ติดต่อเรา</h3>
            <p className="text-gray-400 text-sm">
              อีเมล: info@example.com<br />
              โทรศัพท์: 012-345-6789
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ชื่อเว็บไซต์ของคุณ. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  );
}
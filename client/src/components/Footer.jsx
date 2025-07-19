import React from "react";

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white p-8 mt-8 shadow-inner">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* คอลัมน์ 1: เกี่ยวกับเรา */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              เกี่ยวกับ Auth WebApp
            </h3>
            <p className="text-blue-100 text-sm">
              Auth WebApp
              เป็นระบบตัวอย่างสำหรับการจัดการผู้ใช้และสิทธิ์การเข้าถึง
              ด้วยเทคโนโลยี React และ Tailwind CSS
            </p>
          </div>

          {/* คอลัมน์ 2: ลิงก์ด่วน */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ลิงก์ด่วน</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors duration-200"
                >
                  หน้าหลัก
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors duration-200"
                >
                  บริการ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-200 hover:text-white transition-colors duration-200"
                >
                  นโยบายความเป็นส่วนตัว
                </a>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ 3: ติดต่อเรา */}
          <div>
            <h3 className="text-lg font-semibold mb-2">ติดต่อเรา</h3>
            <p className="text-blue-100 text-sm">
              อีเมล: info@authwebapp.com
              <br />
              โทรศัพท์: 012-345-6789
            </p>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-4 mt-4 text-blue-200 text-sm">
          &copy; {new Date().getFullYear()} Auth WebApp. สงวนลิขสิทธิ์.
        </div>
      </div>
    </footer>
  );
}

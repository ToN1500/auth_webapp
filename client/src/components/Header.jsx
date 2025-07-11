import React from 'react';

export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Test
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200 transition-colors duration-200">หน้าหลัก</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors duration-200">เกี่ยวกับเรา</a></li>
            <li><a href="#" className="hover:text-blue-200 transition-colors duration-200">ติดต่อ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
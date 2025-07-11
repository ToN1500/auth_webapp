import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 p-4 text-white shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Web</Link>

                {/* Hamburger menu icon สำหรับหน้าจอมือถือ */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* เมนูสำหรับหน้าจอ Desktop (ซ่อนบนมือถือ) */}
                <div className="hidden md:flex space-x-6">
                    <Link to="#" className="hover:text-gray-300 transition-colors duration-200">หน้าแรก</Link>
                    <Link to="/userdata" className="hover:text-gray-300 transition-colors duration-200">ข้อมูลผู้ใช้</Link>
                    <Link to="#" className="hover:text-gray-300 transition-colors duration-200">สินค้า</Link>
                    <Link to="#" className="hover:text-gray-300 transition-colors duration-200">บล็อก</Link>
                    <Link to="#" className="hover:text-gray-300 transition-colors duration-200">ติดต่อ</Link>
                </div>
            </div>

            {/* เมนูสำหรับหน้าจอมือถือ (แสดงเมื่อ isOpen เป็น true) */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-2 px-4 pb-2">
                    <Link to="#" className="block hover:bg-gray-700 p-2 rounded transition-colors duration-200">หน้าแรก</Link>
                    <Link to="#" className="block hover:bg-gray-700 p-2 rounded transition-colors duration-200">บริการ</Link>
                    <Link to="#" className="block hover:bg-gray-700 p-2 rounded transition-colors duration-200">สินค้า</Link>
                    <Link to="#" className="block hover:bg-gray-700 p-2 rounded transition-colors duration-200">บล็อก</Link>
                    <Link to="#" className="block hover:bg-gray-700 p-2 rounded transition-colors duration-200">ติดต่อ</Link>
                </div>
            )}
        </nav>
    );
}
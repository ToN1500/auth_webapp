import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e3df] text-[#5d5b54] py-10 mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-[4px] bg-[#1a1a1a] text-white flex items-center justify-center">
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="text-[#37352f] font-semibold">Auth WebApp</span>
          <span className="text-[#a4a097]">·</span>
          <span className="text-[#787671]">Fullstack Authentication & RBAC</span>
        </div>

        <div className="flex items-center gap-6 text-[#787671]">
          <Link to="/" className="hover:text-[#1a1a1a] transition">
            หน้าหลัก
          </Link>
          <Link to="/userdata" className="hover:text-[#1a1a1a] transition">
            สิทธิ์ผู้ใช้
          </Link>
        </div>
      </div>
    </footer>
  );
}

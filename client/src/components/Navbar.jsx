import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  setAuthStatus,
  setLoading,
} from "../features/auth/components/authSlice";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userRole, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
          const response = await fetch(`${API_URL}/api/auth`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            dispatch(
              setAuthStatus({ isAuthenticated: true, userRole: data.role })
            );
          } else {
            localStorage.removeItem("token");
            dispatch(setAuthStatus({ isAuthenticated: false, userRole: null }));
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          dispatch(setAuthStatus({ isAuthenticated: false, userRole: null }));
        }
      } else {
        dispatch(setAuthStatus({ isAuthenticated: false, userRole: null }));
      }
    };
    checkAuth();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isNavActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-[#e5e3df] sticky top-0 z-40 transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex justify-between items-center">
        {/* Brand Logo - Monogram Style */}
        <Link
          to="/"
          className="flex items-center gap-3 text-[#1a1a1a] hover:opacity-85 transition"
        >
          <div className="w-8 h-8 rounded-[6px] bg-[#1a1a1a] text-white flex items-center justify-center shadow-sm">
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="font-semibold text-base tracking-tight text-[#1a1a1a]">
            Auth WebApp
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">
          <Link
            to="/"
            className={`text-sm font-medium transition ${
              isNavActive("/")
                ? "text-[#1a1a1a] font-semibold"
                : "text-[#5d5b54] hover:text-[#1a1a1a]"
            }`}
          >
            หน้าหลัก
          </Link>
          <Link
            to="/userdata"
            className={`text-sm font-medium transition flex items-center gap-1.5 ${
              isNavActive("/userdata")
                ? "text-[#1a1a1a] font-semibold"
                : "text-[#5d5b54] hover:text-[#1a1a1a]"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 text-[#787671]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span>ข้อมูลสิทธิ์ผู้ใช้</span>
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-[4px] bg-[#f6f5f4] text-[#787671] border border-[#e5e3df]">
              Protected
            </span>
          </Link>

          <div className="h-4 w-px bg-[#e5e3df]" />

          {isLoading ? (
            <div className="w-20 h-8 bg-[#f6f5f4] rounded-[6px] animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-[4px] uppercase tracking-wider ${
                  userRole === "admin"
                    ? "bg-[#e6e0f5] text-[#391c57]"
                    : "bg-[#d9f3e1] text-[#1aae39]"
                }`}
              >
                {userRole}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-[#787671] hover:text-[#e03131] transition font-medium px-2 py-1"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-[#37352f] hover:text-[#1a1a1a] px-3 py-1.5 rounded-[6px] hover:bg-[#f6f5f4] transition"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-[#5645d4] hover:bg-[#4534b3] text-white px-3.5 py-1.5 rounded-[8px] transition shadow-sm"
              >
                สมัครสมาชิก
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-[6px] text-[#5d5b54] hover:text-[#1a1a1a] hover:bg-[#f6f5f4] transition"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#e5e3df] bg-white px-6 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-sm text-[#37352f] hover:text-[#1a1a1a] py-1"
          >
            หน้าหลัก
          </Link>
          <Link
            to="/userdata"
            onClick={() => setIsOpen(false)}
            className="block text-sm text-[#37352f] hover:text-[#1a1a1a] py-1"
          >
            ข้อมูลสิทธิ์ผู้ใช้ (Protected)
          </Link>
          <div className="pt-3 border-t border-[#e5e3df]">
            {isAuthenticated ? (
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-[4px] bg-[#f6f5f4] text-[#37352f] uppercase">
                  {userRole}
                </span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="text-xs text-[#e03131] font-medium"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-sm rounded-[6px] border border-[#e5e3df] text-[#37352f]"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2 text-sm rounded-[8px] bg-[#5645d4] text-white"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

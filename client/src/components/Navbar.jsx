import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  setAuthStatus,
  setLoading,
} from "../features/auth/components/authSlice";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true)); // ตั้งค่า isLoading เป็น true
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const API_URL = import.meta.env.VITE_API_URL;
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
            console.error("Token verification failed:", response.status);
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

  if (isLoading) {
    return <div>Loading Navbar...</div>;
  }

  return (
    <nav className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-blue-700 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Auth WebApp
        </Link>
        {/* Hamburger menu icon สำหรับหน้าจอมือถือ */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
        {/* เมนูสำหรับหน้าจอ Desktop (ซ่อนบนมือถือ)  */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            หน้าแรก
          </Link>
          <Link
            to="/userdata"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            ข้อมูลผู้ใช้
          </Link>
          <Link
            to="#"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            สินค้า
          </Link>
          <Link
            to="#"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            บล็อก
          </Link>
          <Link
            to="#"
            className="hover:text-blue-600 transition-colors font-medium"
          >
            ติดต่อ
          </Link>
          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition font-semibold"
              >
                Logout
              </button>
              <span className="ml-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase">
                {userRole === "admin" ? "Admin" : "User"}
              </span>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-2 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/* เมนูสำหรับหน้าจอมือถือ (แสดงเมื่อ isOpen เป็น true) */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-4 pb-2 bg-white border rounded shadow">
          <Link
            to="/"
            className="block hover:bg-blue-50 p-2 rounded transition-colors"
          >
            หน้าแรก
          </Link>
          <Link
            to="/userdata"
            className="block hover:bg-blue-50 p-2 rounded transition-colors"
          >
            ข้อมูลผู้ใช้
          </Link>
          <Link
            to="#"
            className="block hover:bg-blue-50 p-2 rounded transition-colors"
          >
            สินค้า
          </Link>
          <Link
            to="#"
            className="block hover:bg-blue-50 p-2 rounded transition-colors"
          >
            บล็อก
          </Link>
          <Link
            to="#"
            className="block hover:bg-blue-50 p-2 rounded transition-colors"
          >
            ติดต่อ
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full mt-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold text-center"
            >
              Login
            </Link>
          )}
          {isAuthenticated && (
            <span className="block mt-2 px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase text-center">
              {userRole === "admin" ? "Admin" : "User"}
            </span>
          )}
        </div>
      )}
    </nav>
  );
}

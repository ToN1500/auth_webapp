import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setLoading } from "./authSlice";

export function Login() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
    setErrorMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    dispatch(setLoading(true));

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        dispatch(loginSuccess({ role: data.role }));
        localStorage.setItem("token", data.token);
        navigate("/userdata");
      } else {
        setErrorMessage(data.msg || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Backend ได้");
    } finally {
      setIsSubmitting(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center items-center px-6 py-12 text-[#37352f]">
      <div className="w-full max-w-[380px] space-y-6">
        {/* Brand & Heading */}
        <div className="text-center space-y-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#1a1a1a] text-white shadow-sm hover:opacity-90 transition"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.5px] text-[#1a1a1a]">
              เข้าสู่ระบบ
            </h1>
            <p className="text-xs text-[#787671] mt-1">
              เข้าถึง Workspace และสิทธิ์การใช้งานของคุณ
            </p>
          </div>
        </div>

        {/* Demo Account Callout (Notion Callout Box Style) */}
        <div className="bg-[#f8f5e8] border border-[#ede9e4] rounded-[8px] p-3.5 flex items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 font-medium text-[#523410]">
              <svg
                className="w-3.5 h-3.5 text-[#dd5b00]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span>บัญชีทดสอบเริ่มต้น</span>
            </div>
            <p className="text-[#787671] font-mono text-[11px]">
              admin@gmail.com / 123456
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1 bg-white hover:bg-[#f6f5f4] text-[#37352f] border border-[#c8c4be] rounded-[6px] text-xs font-medium transition shadow-xs whitespace-nowrap"
          >
            กรอกทันที
          </button>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="bg-[#fde0ec] border border-[#ff64c8] text-[#a02e6d] px-3.5 py-2.5 rounded-[8px] text-xs leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[#787671] mb-1.5"
            >
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition placeholder-[#bbb8b1]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[#787671] mb-1.5"
            >
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition placeholder-[#bbb8b1] pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-xs text-[#787671] hover:text-[#1a1a1a] transition"
                tabIndex={-1}
              >
                {showPassword ? "ซ่อน" : "แสดง"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[44px] bg-[#5645d4] hover:bg-[#4534b3] text-white font-medium rounded-[8px] text-sm transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? "กำลังตรวจสอบ..." : "ดำเนินการต่อ"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-2 text-center text-xs text-[#787671] space-y-2">
          <p>
            ยังไม่มีบัญชีใช้งาน?{" "}
            <Link
              to="/register"
              className="text-[#0075de] hover:underline font-medium"
            >
              สร้างบัญชีใหม่
            </Link>
          </p>
          <Link
            to="/"
            className="inline-block text-[#a4a097] hover:text-[#5d5b54] transition text-[11px]"
          >
            &larr; กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}

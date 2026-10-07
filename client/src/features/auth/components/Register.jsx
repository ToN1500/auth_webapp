import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok && (data.success || response.status === 201)) {
        setSuccessMessage("สร้างบัญชีสำเร็จ! กำลังนำคุณไปหน้าเข้าสู่ระบบ...");
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setErrorMessage(data.msg || "การลงทะเบียนล้มเหลว");
      }
    } catch (error) {
      console.error("Error during register:", error);
      setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ Backend ได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-center items-center px-6 py-12 text-[#37352f]">
      <div className="w-full max-w-[400px] space-y-6">
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
              สร้างบัญชีผู้ใช้งาน
            </h1>
            <p className="text-xs text-[#787671] mt-1">
              กำหนดสิทธิ์เพื่อทดสอบระบบ Role-Based Access Control
            </p>
          </div>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="bg-[#fde0ec] border border-[#ff64c8] text-[#a02e6d] px-3.5 py-2.5 rounded-[8px] text-xs leading-relaxed">
            {errorMessage}
          </div>
        )}

        {/* Success Notice */}
        {successMessage && (
          <div className="bg-[#d9f3e1] border border-[#1aae39] text-[#1aae39] px-3.5 py-2.5 rounded-[8px] text-xs leading-relaxed">
            {successMessage}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-[#787671] mb-1.5"
            >
              ชื่อผู้ใช้งาน (Name)
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="สมชาย ใจดี"
              className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition placeholder-[#bbb8b1]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[#787671] mb-1.5"
            >
              อีเมล (Email)
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="somchai@example.com"
              className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition placeholder-[#bbb8b1]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#787671] mb-1.5"
              >
                รหัสผ่าน
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="อย่างน้อย 6 ตัว"
                className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition placeholder-[#bbb8b1]"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-[#787671] mb-1.5"
              >
                ยืนยันรหัสผ่าน
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="พิมพ์ซ้ำอีกครั้ง"
                className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition placeholder-[#bbb8b1]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-xs font-medium text-[#787671] mb-1.5"
            >
              สิทธิ์การเข้าถึง (Access Role)
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-[44px] px-3.5 bg-white border border-[#c8c4be] rounded-[8px] text-[#1a1a1a] text-sm focus:outline-none focus:border-[#5645d4] focus:ring-1 focus:ring-[#5645d4] transition cursor-pointer"
            >
              <option value="user">User (ผู้ใช้งานทั่วไป)</option>
              <option value="admin">Admin (ผู้ดูแลระบบ)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[44px] bg-[#5645d4] hover:bg-[#4534b3] text-white font-medium rounded-[8px] text-sm transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? "กำลังบันทึก..." : "สร้างบัญชีผู้ใช้"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-2 text-center text-xs text-[#787671] space-y-2">
          <p>
            มีบัญชีผู้ใช้งานอยู่แล้ว?{" "}
            <Link
              to="/login"
              className="text-[#0075de] hover:underline font-medium"
            >
              เข้าสู่ระบบที่นี่
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

import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-blue-50 to-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-sm">Auth WebApp</h1>
      <p className="text-lg md:text-2xl text-blue-700 mb-8 max-w-2xl">ระบบจัดการผู้ใช้และสิทธิ์การเข้าถึงที่ปลอดภัยและทันสมัย เหมาะสำหรับองค์กรและธุรกิจยุคใหม่</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow transition"
        >
          เข้าสู่ระบบ
        </Link>
        <Link
          to="/register"
          className="bg-white border border-blue-700 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg shadow transition"
        >
          สมัครสมาชิก
        </Link>
      </div>
    </section>
  );
}

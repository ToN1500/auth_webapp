import { Link } from "react-router-dom";

export function HomePage() {
  return (
<<<<<<< HEAD
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-gray-700 mb-6">
          This is the home page of our application.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </Link>
        </div>
=======
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
>>>>>>> fef61a3b8483f3d98a055b51df2314d4321f50d3
      </div>
    </section>
  );
}

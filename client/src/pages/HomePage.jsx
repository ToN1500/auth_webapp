import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function HomePage() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  return (
    <div className="w-full">
      {/* Notion Navy Hero Band */}
      <section className="bg-[#0a1530] text-white py-24 px-6 border-b border-[#1a2a52]">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a2a52] text-[#d6b6f6] text-xs font-medium border border-[#391c57]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7b3ff2]"></span>
            <span>Authentication System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-1px] text-white leading-[1.2]">
            ระบบจัดการผู้ใช้งาน <br />
            และสิทธิ์การเข้าถึง
          </h1>

          <p className="text-[#a4a097] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            ระบบยืนยันตัวตนด้วย JSON Web Token (JWT) พร้อมการแบ่งระดับสิทธิ์
            (Role-Based Access Control) เชื่อมต่อฐานข้อมูล MySQL
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#1a2a52]/80 border border-[#2a3c6b] p-3 rounded-[8px]">
                <span className="text-sm text-[#dcecfa]">
                  เข้าสู่ระบบแล้ว:{" "}
                  <span className="font-semibold text-white uppercase px-1.5 py-0.5 rounded-[4px] bg-[#391c57] text-[#d6b6f6] text-xs">
                    {userRole}
                  </span>
                </span>
                <Link
                  to="/userdata"
                  className="bg-[#5645d4] hover:bg-[#4534b3] text-white text-sm font-medium px-4 py-2 rounded-[8px] transition"
                >
                  เข้าดูข้อมูลผู้ใช้ &rarr;
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-[#5645d4] hover:bg-[#4534b3] text-white font-medium text-sm px-5 py-2.5 rounded-[8px] transition shadow-sm"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/register"
                  className="bg-transparent hover:bg-white/10 text-white font-medium text-sm px-5 py-2.5 rounded-[8px] border border-[#a4a097] transition"
                >
                  สมัครสมาชิก
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pastel Feature Cards */}
      <section className="max-w-[1000px] mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Lavender (Role-Based Access) */}
          <div className="bg-[#e6e0f5] p-7 rounded-[12px] border border-[#d6b6f6] text-[#37352f] space-y-3">
            <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#391c57] text-white text-[11px] font-semibold">
              RBAC
            </span>
            <h3 className="text-base font-semibold text-[#1a1a1a]">
              Role-Based Access Control
            </h3>
            <p className="text-xs text-[#5d5b54] leading-relaxed">
              แยกสิทธิ์การเข้าถึงระหว่าง Admin และ User พร้อมการป้องกันทั้งฝั่ง Client Route และ Server Middleware
            </p>
          </div>

          {/* Card 2: Mint (JWT Authentication) */}
          <div className="bg-[#d9f3e1] p-7 rounded-[12px] border border-[#b2e2be] text-[#37352f] space-y-3">
            <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#1aae39] text-white text-[11px] font-semibold">
              JWT
            </span>
            <h3 className="text-base font-semibold text-[#1a1a1a]">
              Stateless Authentication
            </h3>
            <p className="text-xs text-[#5d5b54] leading-relaxed">
              ยืนยันตัวตนผ่าน Bearer Token ที่เข้ารหัสปลอดภัย ไม่ต้องพึ่งพา Session Storage บนเซิร์ฟเวอร์
            </p>
          </div>

          {/* Card 3: Peach (Password Security) */}
          <div className="bg-[#ffe8d4] p-7 rounded-[12px] border border-[#fcd3b3] text-[#37352f] space-y-3">
            <span className="inline-block px-2 py-0.5 rounded-[4px] bg-[#793400] text-white text-[11px] font-semibold">
              Bcrypt
            </span>
            <h3 className="text-base font-semibold text-[#1a1a1a]">
              Password Encryption
            </h3>
            <p className="text-xs text-[#5d5b54] leading-relaxed">
              เข้ารหัสรหัสผ่านด้วย Salt Rounds 10 ป้องกันการโจมตีแบบ Brute-force และเก็บบันทึกลง MySQL อย่างรัดกุม
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

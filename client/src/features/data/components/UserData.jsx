import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../auth/components/authSlice";

function UserData() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("ไม่พบ Token กรุณาเข้าสู่ระบบก่อนเข้าใช้งาน");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("เซสชันหมดอายุหรือสิทธิ์ไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่");
            localStorage.removeItem("token");
          } else {
            setError(`เซิร์ฟเวอร์ตอบกลับรหัส: ${response.status}`);
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ Backend ได้");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [API_URL]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="max-w-[800px] mx-auto py-20 px-6 text-center space-y-3">
        <div className="w-6 h-6 border-2 border-[#5645d4] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-[#787671]">กำลังโหลดข้อมูล Workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[480px] mx-auto py-20 px-6">
        <div className="bg-[#fde0ec] border border-[#ff64c8] rounded-[8px] p-5 space-y-3 text-center">
          <div className="text-sm font-semibold text-[#a02e6d]">การเข้าถึงถูกปฏิเสธ</div>
          <p className="text-xs text-[#a02e6d]/80">{error}</p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block bg-[#5645d4] hover:bg-[#4534b3] text-white text-xs font-medium px-4 py-2 rounded-[6px] transition"
            >
              ไปหน้าเข้าสู่ระบบ &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[860px] mx-auto py-12 px-6">
      {/* Notion Page Icon & Title */}
      <div className="space-y-4 mb-8">
        <div className="w-12 h-12 rounded-[10px] bg-[#f6f5f4] border border-[#e5e3df] text-[#37352f] flex items-center justify-center shadow-xs">
          <svg
            className="w-6 h-6 text-[#37352f]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-[-0.5px] text-[#1a1a1a]">
            {profile?.name}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-medium text-[#787671] hover:text-[#e03131] hover:bg-[#f6f5f4] rounded-[6px] border border-[#e5e3df] transition"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>

      {/* Notion Page Properties Table */}
      <div className="border-t border-b border-[#e5e3df] py-3 my-6 space-y-2.5 text-xs">
        {/* Property: User ID */}
        <div className="grid grid-cols-[140px_1fr] items-center">
          <div className="text-[#787671] flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#787671]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
              <line x1="10" y1="3" x2="8" y2="21" />
              <line x1="16" y1="3" x2="14" y2="21" />
            </svg>
            <span>Record ID</span>
          </div>
          <div className="font-mono text-[#37352f] font-medium">
            {profile?.id}
          </div>
        </div>

        {/* Property: Email */}
        <div className="grid grid-cols-[140px_1fr] items-center">
          <div className="text-[#787671] flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#787671]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Email</span>
          </div>
          <div className="font-mono text-[#37352f]">{profile?.email}</div>
        </div>

        {/* Property: Role */}
        <div className="grid grid-cols-[140px_1fr] items-center">
          <div className="text-[#787671] flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#787671]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
              <circle cx="7" cy="7" r=".5" fill="currentColor" />
            </svg>
            <span>Access Role</span>
          </div>
          <div>
            <span
              className={`inline-block px-2 py-0.5 rounded-[4px] font-medium text-[11px] uppercase ${
                profile?.role === "admin"
                  ? "bg-[#e6e0f5] text-[#391c57]"
                  : "bg-[#d9f3e1] text-[#1aae39]"
              }`}
            >
              {profile?.role}
            </span>
          </div>
        </div>

        {/* Property: Session Token */}
        <div className="grid grid-cols-[140px_1fr] items-center">
          <div className="text-[#787671] flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-[#787671]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Session Status</span>
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#1aae39] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1aae39]"></span>
              Active (Bearer Token Verified)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;

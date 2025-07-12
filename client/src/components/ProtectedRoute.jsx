import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  // ดึง state จาก Redux Store
  const { isAuthenticated, userRole, isLoading } = useSelector(
    (state) => state.auth
  ); // <--- ดึง state จาก auth slice

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    navigate("/");
    return null;
  }

  return children;
}

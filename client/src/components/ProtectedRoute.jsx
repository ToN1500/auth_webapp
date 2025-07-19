import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  // ดึง state จาก Redux Store
  const { isAuthenticated, userRole, isLoading } = useSelector(
    (state) => state.auth
  ); // <--- ดึง state จาก auth slice

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, isLoading, allowedRoles, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (
    !isAuthenticated ||
    (allowedRoles && userRole && !allowedRoles.includes(userRole))
  ) {
    return null;
  }

  return children;
}

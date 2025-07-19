import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
<<<<<<< HEAD
=======
import { useEffect } from "react";
>>>>>>> fef61a3b8483f3d98a055b51df2314d4321f50d3

export function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  // ดึง state จาก Redux Store
  const { isAuthenticated, userRole, isLoading } = useSelector(
    (state) => state.auth
  ); // <--- ดึง state จาก auth slice

<<<<<<< HEAD
=======
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, isLoading, allowedRoles, navigate]);

>>>>>>> fef61a3b8483f3d98a055b51df2314d4321f50d3
  if (isLoading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    navigate("/");
=======
  if (
    !isAuthenticated ||
    (allowedRoles && userRole && !allowedRoles.includes(userRole))
  ) {
>>>>>>> fef61a3b8483f3d98a055b51df2314d4321f50d3
    return null;
  }

  return children;
}

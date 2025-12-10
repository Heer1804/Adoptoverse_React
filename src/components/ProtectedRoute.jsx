import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ userRole, requiredRole, children }) {
  if (userRole !== requiredRole) {
    alert("Access denied! You are not authorized to view this page.");
    return <Navigate to="/home" />;
  }
  return children;
}

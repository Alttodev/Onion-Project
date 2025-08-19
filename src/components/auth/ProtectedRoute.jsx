import { useLocalStore } from "@/store/useLocalStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
const { token } = useLocalStore();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";
import { useLocalStore } from "../../store/useLocalStore";

const ProtectedRoute = () => {
const { token } = useLocalStore();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

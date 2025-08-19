import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { CustomerLayout } from "./components/layout/layout";
import DashboardHome from "./pages/DashboardHome";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import Reset from "./components/auth/Reset";
import CustomerList from "./pages/CustomerList";
import ResetPassword from "./components/auth/ResetPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/error" element={<ErrorPage />}/>
          <Route element={<ProtectedRoute />}>
            <Route element={<CustomerLayout />}>
              <Route path="/home" element={<DashboardHome />} />
              <Route path="/list/:id" element={<CustomerList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

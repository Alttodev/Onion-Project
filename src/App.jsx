import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { DashboardLayout } from "./components/layout/layout";
import DashboardHome from "./pages/DashboardHome";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import Reset from "./components/auth/Reset";
import CustomerList from "./pages/CustomerList";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/reset" element={<Reset />} />
        <Route element={<DashboardLayout />}>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/list/:id" element={<CustomerList />} />
        </Route>
      </Routes>
      </Router>
      
      </div>
  );
}
export default App;

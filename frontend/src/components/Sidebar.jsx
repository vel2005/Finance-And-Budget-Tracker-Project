import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();

const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");

    navigate("/login");

};
  return (
    <div className="sidebar">
      <NavLink to="/dashboard">Dashboard</NavLink>

       <NavLink to="/income">Income</NavLink>

      <NavLink to="/expenses">Expenses</NavLink>

      <NavLink to="/budgets">Budgets</NavLink>
       
    
  
      <NavLink to="/reports">Reports</NavLink>
       
      <NavLink to="/profile">
    👤 Profile
</NavLink>
      <button className="logout-btn"onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
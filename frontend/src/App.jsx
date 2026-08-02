import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css";
import Expense from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import ProtectedRoute from "./components/ProtectedRoute";
import Income from "./pages/Income";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route
    path="/income"
    element={
        <ProtectedRoute>
            <Income />
        </ProtectedRoute>
    }
/>    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
     

      </Routes>
    </BrowserRouter>
  );
}

export default App;
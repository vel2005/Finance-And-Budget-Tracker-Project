import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/login", {

        email,
        password

      });

      if (response.data.token) {

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", "true");

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert(response.data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">

            Login

          </button>

        </form>

        <p>

          Don't have an account?

          <Link to="/register"> Register</Link>

        </p>

      </div>

    </div>

  );

}

export default Login;
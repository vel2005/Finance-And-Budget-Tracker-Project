import "../styles/Navbar.css";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (

        <div className="navbar">

            <div className="logo">

                💰 Smart Expense Tracker

            </div>

            <button
                className="theme-btn"
                onClick={() => setDarkMode(!darkMode)}
            >

                {darkMode ? "☀ Light" : "🌙 Dark"}

            </button>

        </div>

    );

}

export default Navbar;
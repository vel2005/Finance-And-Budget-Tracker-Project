import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/global.css";

import ThemeProvider from "./context/ThemeContext";
import FinanceProvider from "./context/FinanceContext";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <ThemeProvider>

            <FinanceProvider>

                <App />

            </FinanceProvider>

        </ThemeProvider>

    </React.StrictMode>

);
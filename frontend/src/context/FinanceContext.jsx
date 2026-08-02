import { createContext, useState } from "react";

export const FinanceContext = createContext();

function FinanceProvider({ children }) {

    const [expenses, setExpenses] = useState([]);

    const [income, setIncome] = useState([]);

    const [budgets, setBudgets] = useState([]);

    return (

        <FinanceContext.Provider
            value={{
                expenses,
                setExpenses,

                income,
                setIncome,

                budgets,
                setBudgets
            }}
        >

            {children}

        </FinanceContext.Provider>

    );

}

export default FinanceProvider;
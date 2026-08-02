import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {

    try {

      const [incomeRes, expenseRes, budgetRes] = await Promise.all([
        api.get("/income"),
        api.get("/expense"),
        api.get("/budget"),
      ]);

      setIncome(incomeRes.data);
      setExpenses(expenseRes.data);
      setBudgets(budgetRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  const totalIncome = income.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const totalBudget = budgets.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const savings = totalIncome - totalExpense;

  const budgetUsed =
    totalBudget === 0
      ? 0
      : Math.min((totalExpense / totalBudget) * 100, 100);

  const recentTransactions = [

    ...income.map(item => ({
      ...item,
      type: "Income"
    })),

    ...expenses.map(item => ({
      ...item,
      type: "Expense"
    }))

  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (

    <Layout>

      <h1>Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card income-card">

          <h3>Total Income</h3>

          <h2>₹ {totalIncome.toLocaleString()}</h2>

        </div>

        <div className="dashboard-card expense-card">

          <h3>Total Expense</h3>

          <h2>₹ {totalExpense.toLocaleString()}</h2>

        </div>

        <div className="dashboard-card savings-card">

          <h3>Savings</h3>

          <h2>₹ {savings.toLocaleString()}</h2>

        </div>

        <div className="dashboard-card budget-card">

          <h3>Total Budget</h3>

          <h2>₹ {totalBudget.toLocaleString()}</h2>

        </div>

      </div>

      <div className="progress-section">

        <h3>Budget Utilization</h3>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${budgetUsed}%` }}
          ></div>

        </div>

        <p>{budgetUsed.toFixed(1)} % Used</p>

      </div>

      <div className="recent-section">

        <h3>Recent Transactions</h3>

        <table>

          <thead>

            <tr>

              <th>Date</th>
              <th>Title</th>
              <th>Type</th>
              <th>Amount</th>

            </tr>

          </thead>

          <tbody>

            {recentTransactions.length === 0 ? (

              <tr>

                <td colSpan="4">

                  No Transactions

                </td>

              </tr>

            ) : (

              recentTransactions.map(item => (

                <tr key={item.id}>

                  <td>{item.date}</td>

                  <td>{item.title}</td>

                  <td>{item.type}</td>

                  <td>

                    {item.type === "Income" ? "+" : "-"}

                    ₹ {item.amount}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Dashboard;
import { useState, useEffect, useMemo } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

import "../styles/Reports.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Reports() {
  const [income, setIncome] = useState([]);
const [expenses, setExpenses] = useState([]);
const [budgets, setBudgets] = useState([]);

  const totalIncome = useMemo(
    () =>
      income.reduce((sum, item) => sum + Number(item.amount), 0),
    [income]
  );

  const totalExpense = useMemo(
    () =>
      expenses.reduce((sum, item) => sum + Number(item.amount), 0),
    [expenses]
  );

  const totalBudget = useMemo(
    () =>
      budgets.reduce((sum, item) => sum + Number(item.amount), 0),
    [budgets]
  );

  const savings = totalIncome - totalExpense;

  const budgetUsed =
    totalBudget === 0
      ? 0
      : ((totalExpense / totalBudget) * 100).toFixed(1);

  const topCategories = useMemo(() => {
    const categoryMap = {};

    expenses.forEach((expense) => {
      if (!categoryMap[expense.category]) {
        categoryMap[expense.category] = 0;
      }

      categoryMap[expense.category] += Number(expense.amount);
    });

    return Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [expenses]);

  const recentTransactions = useMemo(() => {
    return [
      ...income.map((item) => ({
        ...item,
        type: "Income",
      })),
      ...expenses.map((item) => ({
        ...item,
        type: "Expense",
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [income, expenses]);
const chartData = [
  {
    name: "Income",
    amount: totalIncome,
  },
  {
    name: "Expense",
    amount: totalExpense,
  },
];

const pieData = Object.entries(
  expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);

    return acc;
  }, {})
).map(([name, value]) => ({
  name,
  value,
}));

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];
useEffect(() => {

    fetchData();

}, []);

const fetchData = async () => {

    try {

        const [incomeRes, expenseRes, budgetRes] =
            await Promise.all([

                api.get("/income"),

                api.get("/expense"),

                api.get("/budget")

            ]);

        setIncome(incomeRes.data);

        setExpenses(expenseRes.data);

        setBudgets(budgetRes.data);

    }

    catch(error){

        console.log(error);

    }

};
const exportPDF = async () => {

    try {

        const response = await api.get(

            "/report/pdf",

            {

                responseType: "blob"

            }

        );

        const url = window.URL.createObjectURL(

            new Blob([response.data])

        );

        const link = document.createElement("a");

        link.href = url;

        link.download = "Expense_Report.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    }

    catch(error){

        console.log(error);

        alert("PDF download failed.");

    }

};

const exportExcel = async () => {

    try {

        const response = await api.get(

            "/report/excel",

            {

                responseType:"blob"

            }

        );

        const url = window.URL.createObjectURL(

            new Blob([response.data])

        );

        const link=document.createElement("a");

        link.href=url;

        link.download="Expense_Report.xlsx";

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    }

    catch(error){

        console.log(error);

        alert("Excel download failed.");

    }

};
  return (
    <Layout>
      <div className="reports-page">

        <h1>Reports</h1>

        <div className="report-cards">

          <div className="report-card">
            <h3>Total Income</h3>
            <h2>₹ {totalIncome.toLocaleString()}</h2>
          </div>

          <div className="report-card">
            <h3>Total Expense</h3>
            <h2>₹ {totalExpense.toLocaleString()}</h2>
          </div>

          <div className="report-card">
            <h3>Savings</h3>
            <h2>₹ {savings.toLocaleString()}</h2>
          </div>

          <div className="report-card">
            <h3>Budget Used</h3>
            <h2>{budgetUsed}%</h2>
          </div>

        </div>
        <div className="charts-container">

  <div className="chart-card">

    <h2>Income vs Expense</h2>

    <ResponsiveContainer width="100%" height={320}>

      <BarChart data={chartData}>

        <CartesianGrid strokeDasharray="3 3"/>

        <XAxis dataKey="name"/>

        <YAxis/>

        <Tooltip/>

        <Legend/>

        <Bar
          dataKey="amount"
          fill="#2563eb"
          radius={[8,8,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  <div className="chart-card">

    <h2>Expense Categories</h2>

    <ResponsiveContainer width="100%" height={320}>

      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={110}
          label
        >

          {pieData.map((entry,index)=>(

            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />

          ))}

        </Pie>

        <Tooltip/>

        <Legend/>

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>
        <div className="report-section">

          <h2>Top Spending Categories</h2>

          <table>

            <thead>
              <tr>
                <th>Category</th>
                <th>Total Spent</th>
              </tr>
            </thead>

            <tbody>

              {topCategories.length === 0 ? (
                <tr>
                  <td colSpan="2">No Data</td>
                </tr>
              ) : (
                topCategories.map(([category, amount]) => (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>₹ {amount}</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

        <div className="report-section">

          <h2>Recent Transactions</h2>

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
                  <td colSpan="4">No Transactions</td>
                </tr>
              ) : (
                recentTransactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>
                      {item.type === "Income" ? "+" : "-"} ₹
                      {item.amount}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>
        
        </div>

      </div>
      <div className="export-buttons">

<button onClick={exportPDF}>

Export PDF

</button>

<button onClick={exportExcel}>

Export Excel

</button>

</div>
    </Layout>
  );
}

export default Reports;
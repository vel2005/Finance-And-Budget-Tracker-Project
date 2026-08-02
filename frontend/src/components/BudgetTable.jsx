import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/BudgetTable.css";

function BudgetTable({
  budgets,
  setSelectedBudget,
  setShowModal,
  fetchBudgets,
}) {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    try {

      const response = await api.get("/expense");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const calculateSpent = (category) => {

    return expenses

      .filter((expense) => expense.category === category)

      .reduce(

        (sum, expense) => sum + Number(expense.amount),

        0

      );

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this budget?")) return;

    try {

      await api.delete(`/budget/${id}`);

      fetchBudgets();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="budget-table-container">

      <table className="budget-table">

        <thead>

          <tr>

            <th>Category</th>

            <th>Month</th>

            <th>Budget</th>

            <th>Spent</th>

            <th>Remaining</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {budgets.length === 0 ? (

            <tr>

              <td colSpan="6" className="no-data">

                No budgets found.

              </td>

            </tr>

          ) : (

            budgets.map((budget) => {

              const spent = calculateSpent(budget.category);

              const remaining = Number(budget.amount) - spent;

              return (

                <tr key={budget.id}>

                  <td>{budget.category}</td>

                  <td>{budget.month}</td>

                  <td>₹ {budget.amount}</td>

                  <td>₹ {spent}</td>

                  <td
                    style={{
                      color: remaining < 0 ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    ₹ {remaining}
                  </td>

                  <td>

                    <button
                      className="edit-btn"
                      onClick={() => {

                        setSelectedBudget(budget);

                        setShowModal(true);

                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(budget.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              );

            })

          )}

        </tbody>

      </table>

    </div>

  );

}

export default BudgetTable;
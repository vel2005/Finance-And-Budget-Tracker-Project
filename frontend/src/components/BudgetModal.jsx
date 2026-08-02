import { useState } from "react";
import api from "../services/api";
import "../styles/BudgetModal.css";

function BudgetModal({
  setShowModal,
  selectedBudget,
  fetchBudgets,
}) {

  const [category, setCategory] = useState(
    selectedBudget ? selectedBudget.category : "Food"
  );

  const [amount, setAmount] = useState(
    selectedBudget ? selectedBudget.amount : ""
  );

  const [month, setMonth] = useState(
    selectedBudget ? selectedBudget.month : "January"
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!category || !amount || !month) {

      alert("Please fill all required fields.");

      return;

    }

    const budgetData = {

      category,

      amount: Number(amount),

      month,
      year: new Date().getFullYear()

    };

    try {

      if (selectedBudget) {

        await api.put(

          `/budget/${selectedBudget.id}`,

          budgetData

        );

      } else {

        await api.post(

          "/budget",

          budgetData

        );

      }

      fetchBudgets();

      setShowModal(false);

    } catch (error) {

      console.log(error);

      alert("Failed to save budget.");

    }

  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>

          {selectedBudget ? "Edit Budget" : "Add Budget"}

        </h2>

        <form onSubmit={handleSubmit}>

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >

            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Health</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Other</option>

          </select>

          <label>Budget Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Month</label>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >

            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>

          </select>

          <div className="modal-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              {selectedBudget ? "Update" : "Save"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default BudgetModal;
import { useState } from "react";
import api from "../services/api";
import "../styles/IncomeModal.css";

function IncomeModal({
  setShowModal,
  selectedIncome,
  fetchIncome,
}) {

  const [title, setTitle] = useState(
    selectedIncome ? selectedIncome.title : ""
  );

  const [amount, setAmount] = useState(
    selectedIncome ? selectedIncome.amount : ""
  );

  const [source, setSource] = useState(
    selectedIncome ? selectedIncome.source : "Salary"
  );

  const [date, setDate] = useState(
    selectedIncome ? selectedIncome.date : ""
  );

  const [notes, setNotes] = useState(
    selectedIncome ? selectedIncome.notes : ""
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title || !amount || !date) {
      alert("Please fill all required fields.");
      return;
    }

    const incomeData = {
      title,
      amount: Number(amount),
      source,
      date,
      notes,
    };

    try {

      if (selectedIncome) {

        await api.put(
          `/income/${selectedIncome.id}`,
          incomeData
        );

      } else {

        await api.post(
          "/income",
          incomeData
        );

      }

      fetchIncome();

      setShowModal(false);

    } catch (error) {

      console.log(error);

      alert("Failed to save income.");

    }

  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {selectedIncome ? "Edit Income" : "Add Income"}
        </h2>

        <form onSubmit={handleSubmit}>

          <label>Income Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label>Source</label>

          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option>Salary</option>
            <option>Freelancing</option>
            <option>Business</option>
            <option>Investment</option>
            <option>Bonus</option>
            <option>Rental</option>
            <option>Gift</option>
            <option>Other</option>
          </select>

          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Notes</label>

          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="modal-buttons">

            <button
              type="submit"
              className="save-btn"
            >
              {selectedIncome ? "Update" : "Save"}
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

export default IncomeModal;
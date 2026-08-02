import { useState, useContext } from "react";
import Layout from "../components/Layout";
import IncomeModal from "../components/IncomeModal";
import IncomeTable from "../components/IncomeTable";
import "../styles/Income.css";

import { useEffect } from "react";
import api from "../services/api";
function Income() {
  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [income, setIncome] = useState([]);

  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");
  const fetchIncome = async () => {
  try {
    const response = await api.get("/income");
    setIncome(response.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchIncome();
}, []);
  const filteredIncome = income.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSource =
      source === "All" || item.source === source;

    return matchesSearch && matchesSource;
  });

  return (
    <Layout>
      <div className="income-header">
        <h1>Income</h1>

        <button
          className="add-btn"
          onClick={() => {
            setSelectedIncome(null);
            setShowModal(true);
          }}
        >
          + Add Income
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Income..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option>All</option>
          <option>Salary</option>
          <option>Freelancing</option>
          <option>Business</option>
          <option>Investment</option>
          <option>Bonus</option>
          <option>Rental</option>
          <option>Gift</option>
          <option>Other</option>
        </select>
      </div>

      <IncomeTable
  incomeList={filteredIncome}
  setSelectedIncome={setSelectedIncome}
  setShowModal={setShowModal}
  fetchIncome={fetchIncome}
/>

      {showModal && (
        <IncomeModal
    setShowModal={setShowModal}
    selectedIncome={selectedIncome}
    fetchIncome={fetchIncome}
/>
      )}
    </Layout>
  );
}

export default Income;
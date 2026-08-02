import { useState, useContext } from "react";
import Layout from "../components/Layout";
import BudgetModal from "../components/BudgetModal";
import BudgetTable from "../components/BudgetTable";
import "../styles/Budgets.css";
import { useEffect } from "react";
import api from "../services/api";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("All");

  const filteredBudgets = budgets.filter((budget) => {

    const matchSearch = budget.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchMonth =
      month === "All" || budget.month === month;

    return matchSearch && matchMonth;

  });
 const fetchBudgets = async () => {

  try {

    const response = await api.get("/budget");

    setBudgets(response.data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchBudgets();

}, []);
  return (
    <Layout>

      <div className="budget-header">

        <h1>Budgets</h1>

        <button
          className="add-btn"
          onClick={() => {
            setSelectedBudget(null);
            setShowModal(true);
          }}
        >
          + Add Budget
        </button>

      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >

          <option>All</option>
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

      </div>

     <BudgetTable
    budgets={filteredBudgets}
    setSelectedBudget={setSelectedBudget}
    setShowModal={setShowModal}
    fetchBudgets={fetchBudgets}
/>

      {showModal && (

<BudgetModal
    setShowModal={setShowModal}
    selectedBudget={selectedBudget}
    fetchBudgets={fetchBudgets}
/>

)}

    </Layout>
  );

}

export default Budgets;
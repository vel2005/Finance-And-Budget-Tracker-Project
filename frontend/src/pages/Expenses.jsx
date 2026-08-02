import { useState } from "react";
import Layout from "../components/Layout";
import ExpenseModal from "../components/ExpenseModal";
import ExpenseTable from "../components/ExpenseTable";
import "../styles/Expenses.css";
import {useEffect} from "react";
import api from "../services/api";
function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
const [selectedExpense, setSelectedExpense] = useState(null);
    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");
    const fetchExpenses = async () => {

    try{

        const response = await api.get("/expense");

        setExpenses(response.data);

    }

    catch(error){

        console.log(error);

    }

};

useEffect(()=>{

    fetchExpenses();

},[]);
    const filteredExpenses = expenses.filter((expense) => {

        const matchesSearch =
            expense.title.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "All" || expense.category === category;

        return matchesSearch && matchesCategory;

    });

    return (

        <Layout>

            <div className="expense-header">

                <h1>Expenses</h1>

                <button
                    className="add-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Expense
                </button>

            </div>

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search Expense..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >

                    <option>All</option>
                    <option>Food</option>
                    <option>Travel</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Entertainment</option>
                    <option>Other</option>

                </select>

            </div>

      <ExpenseTable
    expenses={filteredExpenses}
    setSelectedExpense={setSelectedExpense}
    setShowModal={setShowModal}
    fetchExpenses={fetchExpenses}
/>
            {showModal && (

                <ExpenseModal
    setShowModal={setShowModal}
    setExpenses={setExpenses}
    fetchExpenses={fetchExpenses}
/>

            )}

        </Layout>

    );

}

export default Expenses;
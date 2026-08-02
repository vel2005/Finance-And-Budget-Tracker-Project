import { useState } from "react";
import "../styles/ExpenseModal.css";
import api from "../services/api";
function ExpenseModal({ setShowModal, selectedExpense, fetchExpenses }) {

    const [title, setTitle] = useState(selectedExpense ? selectedExpense.title : "");

const [amount, setAmount] = useState(selectedExpense ? selectedExpense.amount : "");

const [category, setCategory] = useState(selectedExpense ? selectedExpense.category : "Food");

const [date, setDate] = useState(selectedExpense ? selectedExpense.date : "");

const [notes, setNotes] = useState(selectedExpense ? selectedExpense.notes : "");

   const handleSubmit = async (e)=>{

    e.preventDefault();

    if(!title || !amount || !date){

        alert("Fill all required fields");

        return;

    }

    const expenseData={

        title,

        amount:Number(amount),

        category,

        date,

        notes

    };

    try{

        if(selectedExpense){

            await api.put(

                `/expense/${selectedExpense.id}`,

                expenseData

            );

        }

        else{

            await api.post(

                "/expense",

                expenseData

            );

        }

        fetchExpenses();

        setShowModal(false);

    }

    catch(error){

        console.log(error);

        alert("Failed to save expense");

    }

};
    return (

        <div className="modal-overlay">

            <div className="modal">

               <h2>

{selectedExpense ? "Edit Expense" : "Add Expense"}

</h2>
                <form onSubmit={handleSubmit}>

                    <label>Expense Title</label>

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
                            {selectedExpense ? "Update" : "Save"}
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

export default ExpenseModal;
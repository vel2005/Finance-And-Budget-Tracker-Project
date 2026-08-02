import "../styles/ExpenseTable.css";
import api from "../services/api";
function ExpenseTable({ expenses,setSelectedExpense,setShowModal,fetchExpenses }) {
const handleDelete = async(id)=>{

    if(!window.confirm("Delete this expense?")) return;

    try{

        await api.delete(`/expense/${id}`);

        fetchExpenses();

    }

    catch(error){

        console.log(error);

    }

};
    return (

        <div className="expense-table-container">

            <table className="expense-table">

                <thead>

                    <tr>

                        <th>Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {expenses.length === 0 ? (

                        <tr>

                            <td colSpan="5" className="no-data">

                                No expenses found.

                            </td>

                        </tr>

                    ) : (

                        expenses.map((expense) => (

                            <tr key={expense.id}>

                                <td>{expense.date}</td>

                                <td>{expense.title}</td>

                                <td>{expense.category}</td>

                                <td>₹ {expense.amount}</td>

                                <td>

                                   <button
    className="edit-btn"
    onClick={() => {

        setSelectedExpense(expense);

        setShowModal(true);

    }}
>

Edit

</button>

                                   <button

className="delete-btn"

onClick={()=>handleDelete(expense.id)}

>

Delete

</button>
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default ExpenseTable;
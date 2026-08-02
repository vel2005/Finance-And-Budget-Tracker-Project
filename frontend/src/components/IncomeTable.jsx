import "../styles/IncomeTable.css";
import api from "../services/api";

function IncomeTable({
  incomeList,
  setSelectedIncome,
  setShowModal,
  fetchIncome,
}) {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this income?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/income/${id}`);

      fetchIncome();

    } catch (error) {

      console.log(error);

      alert("Failed to delete income.");

    }

  };

  return (
    <div className="income-table-container">
      <table className="income-table">

        <thead>

          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Source</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {incomeList.length === 0 ? (

            <tr>
              <td colSpan="5" className="no-data">
                No income found.
              </td>
            </tr>

          ) : (

            incomeList.map((income) => (

              <tr key={income.id}>

                <td>{income.date}</td>

                <td>{income.title}</td>

                <td>{income.source}</td>

                <td>₹ {income.amount}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedIncome(income);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(income.id)}
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

export default IncomeTable;
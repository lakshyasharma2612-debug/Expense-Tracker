import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, [page]);

  function fetchExpenses() {
    fetch(`http://localhost:8080/expenses?page=${page}&size=5`)
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data.content);
      });
  }

  function addExpense(e) {
    e.preventDefault();
    setError("");

    fetch("http://localhost:8080/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        amount: amount,
        category: category,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message || "Invalid input");
          });
        }
        return res.json();
      })
      .then(() => {
        setTitle("");
        setAmount("");
        setCategory("");
        fetchExpenses();
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function deleteExpense(id) {
    fetch(`http://localhost:8080/expenses/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchExpenses();
    });
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Expense Tracker</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={addExpense} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} style={{ marginBottom: "10px" }}>
            {expense.title} – ₹{expense.amount} ({expense.category})
            <button
              onClick={() => deleteExpense(expense.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <button
          onClick={() => setPage(page + 1)}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
   const [sortOption, setSortOption] = useState("title-asc");

 
  
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
  const [sortField,sortOrder] = sortOption.split("-");
  const sortedExpenses=[...expenses].sort((a,b)=>{
    const valA=a[sortField];
    const valB=b[sortField];
    if(typeof valA==="number")
    {
      return sortOrder==="asc"?valA-valB:valB-valA;

    }
    const strA=valA?.toLowerCase();
    const strB=valB?.toLowerCase();
    if(strA<strB)return sortOrder==="asc"?-1:1;
    if(strA>strB)return sortOrder==="desc"?1:-1;
    return 0;
  })
 
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial",
      }} >
      <h1>Expense Tracker</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={addExpense} style={{ marginBottom: "20px" }}/>
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
        <form/>
        <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
          <label>
           <strong>Sort By:</strong> {" "}
            <select value={sortOption} onChange={(e)=>setSortOption(e.target.value)}>
              <option value="title-desc">Title ↑</option>
              <option value="title-asc">Title ↓</option>
              <option value="category-desc">Category ↑</option>
              <option value="category-asc">Category ↓</option>
              <option value="amount-desc">Amount ↑</option>
              <option value="amount-asc">Amount ↓</option>
            </select>
          </label>

        </div>
      <ul>
        {sortedExpenses.map((expense) => (
          <li className="option" key={expense.id} style={{ marginBottom: "10px" }}>
            {expense.title} – ₹{expense.amount} ({expense.category})
            <button style={{ marginLeft: "10px" }}
              onClick={() => deleteExpense(expense.id)}
             
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div  className="nav-buttons">
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

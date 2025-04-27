import React, { useState } from "react";
import "./TransactionForm.css";

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!description.trim() || isNaN(amt)) {
      alert("Please enter a valid description and amount.");
      return;
    }

    // ✅ Pass the date as part of the new transaction object
    onAddTransaction({
      description,
      amount: amt,
      category,
      date: new Date().toISOString(), // <-- Date is here, inside the object
    });

    // Clear the form
    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <label htmlFor="description">Description:</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
        <option value="Shopping">Shopping</option> {/* New category */}
        <option value="Bills">Bills</option>       {/* New category */}
      </select>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;

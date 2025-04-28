import { useState } from "react";
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
    onAddTransaction({ description, amount: amt, category });
    setDescription("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Example: S-market"
      />

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Example: -50 or +100"
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <button type="submit" className="filter-button">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;

import { useState } from "react";
import "./TransactionForm.css";

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!description.trim() || isNaN(amt)) {
      alert("Please enter a valid description and amount.");
      return;
    }
    onAddTransaction({ description, amount: amt });
    setDescription("");
    setAmount("");
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
      <label htmlFor="amount">Sum:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Example: -50 or +100"
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;

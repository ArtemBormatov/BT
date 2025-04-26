import React, { useState } from "react";

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || isNaN(amount)) {
      alert("Please enter valid data.");
      return;
    }
    onAdd(description, amount);
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <label>Description:</label>
      <input
        type="text"
        value={description}
        placeholder="Example: S-market"
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Sum:</label>
      <input
        type="number"
        value={amount}
        placeholder="Example: -50 or +100"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;

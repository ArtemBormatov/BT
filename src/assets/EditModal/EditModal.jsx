import { useState } from "react";
import "./EditModal.css";

function EditModal({ transaction, onSave, onCancel }) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category || ""); // New state for category

  const handleSave = () => {
    const amt = parseFloat(amount);
    if (!description.trim() || isNaN(amt)) {
      alert("Please enter valid description and amount.");
      return;
    }
    onSave({ ...transaction, description, amount: amt, category }); // Include category in saved transaction
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        
        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

import React, { useState } from "react";

function EditModal({ transaction, onSave, onClose }) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);

  const handleSave = () => {
    if (!description || isNaN(amount)) {
      alert("Please enter valid data.");
      return;
    }
    onSave(transaction.id, description, amount);
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
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

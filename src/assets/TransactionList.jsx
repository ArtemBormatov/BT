import React from "react";
import EditIcon from "../assets/icons/edit.svg";
import DeleteIcon from "../assets/icons/delete.svg";

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <ul id="transaction-list">
      {transactions.map((tx) => (
        <li key={tx.id} className={tx.amount >= 0 ? "income" : "expense"}>
          <span>{tx.description}</span>
          <span>{tx.amount.toFixed(2)} €</span>
          <button className="icon-button" onClick={() => onEdit(tx)}>
            <img src={EditIcon} alt="Edit" className="icon" />
          </button>
          <button className="icon-button" onClick={() => onDelete(tx.id)}>
            <img src={DeleteIcon} alt="Delete" className="icon" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;

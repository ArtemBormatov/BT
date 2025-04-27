import "./TransactionItem.css";
import editIcon from "../Icons/edit.svg";
import deleteIcon from "../Icons/delete.svg";

function TransactionItem({ transaction, onDelete, onEdit }) {
  const formattedDate = transaction.date
    ? new Date(transaction.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  return (
    <li className={`transaction-item ${transaction.amount > 0 ? "income" : "expense"}`}>
      {/* Date Container */}
      <div className="transaction-item-date">
        <span>{formattedDate}</span>
      </div>

      {/* Description Container */}
      <div className="transaction-item-description">
        <span>{transaction.description}</span>
      </div>

      {/* Category Container */}
      <div className="transaction-item-category">
        <span>{transaction.category}</span>
      </div>

      {/* Amount Container */}
      <div className="transaction-item-amount">
        <span>{transaction.amount.toFixed(2)} €</span>
      </div>

      {/* Buttons Container */}
      <div className="transaction-item-buttons">
        <button className="icon-button" onClick={() => onEdit(transaction)}>
          <img src={editIcon} className="icon" alt="Edit" />
        </button>
        <button className="icon-button" onClick={() => onDelete(transaction.id)}>
          <img src={deleteIcon} className="icon" alt="Delete" />
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;


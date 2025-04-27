import TransactionItem from "../TransactionItem/TransactionItem";
import "./TransactionList.css";

function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <ul className="transaction-list">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          transaction={tx}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TransactionList;

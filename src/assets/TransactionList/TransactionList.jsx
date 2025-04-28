import { useState } from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import FilterModal from "../FilterModal/FilterModal";
import "../TransactionList/TransactionList.css";

function TransactionList({ transactions, onDelete, onEdit }) {
  const [filter, setFilter] = useState("All");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.category === filter);

  const handleFilter = (category) => {
    setFilter(category);
  };

  return (
    <div className="transaction-list-container">
      <button className="filter-button" onClick={() => setShowFilterModal(true)}>
        Filter Transactions
      </button>

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onFilter={handleFilter}
        />
      )}

      <ul className="transaction-list">
        {filteredTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;

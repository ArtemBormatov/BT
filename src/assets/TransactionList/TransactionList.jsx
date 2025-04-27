import { useState } from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import FilterModal from "../FilterModal/FilterModal";
import MonthlyComparisonChart from "../Chart/MonthlyComparisonChart"; // Make sure this import is correct
import "../TransactionList/TransactionList.css";

function TransactionList({ transactions, onDelete, onEdit }) {
  const [filter, setFilter] = useState("All");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showChart, setShowChart] = useState(false); // State for showing the chart

  // Filter transactions based on the category selected
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.category === filter);

  const handleFilter = (category) => {
    setFilter(category);
  };

  // Toggle chart visibility
  const handleShowChart = () => {
    setShowChart(!showChart); // Toggle chart visibility
  };

  // Function to download transactions as CSV
  const downloadCSV = () => {
    const headers = ["Description", "Category", "Amount", "Date"];
    const rows = filteredTransactions.map((transaction) => [
      transaction.description,
      transaction.category,
      transaction.amount.toFixed(2),
      transaction.date,
    ]);

    const csvContent = [
      headers.join(","), // Header row
      ...rows.map((row) => row.join(",")), // Data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "transactions.csv");
    link.click();
  };

  return (
    <div className="transaction-list-container">
      {/* Buttons Container */}
      <div className="button-container">
        <button className="filter-button" onClick={() => setShowFilterModal(true)}>
          Filter Transactions
        </button>
        <button className="export-button" onClick={downloadCSV}>
          Export to CSV
        </button>
        <button className="show-chart-button" onClick={handleShowChart}>
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onFilter={handleFilter}
        />
      )}

      {/* Chart Container */}
      {showChart && (
        <div className="chart-container">
          <MonthlyComparisonChart transactions={filteredTransactions} />
        </div>
      )}

      {/* Transaction List */}
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

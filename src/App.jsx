import { useState, useEffect } from "react";
import TransactionForm from "./assets/TransactionForm/TransactionForm";
import TransactionList from "./assets/TransactionList/TransactionList";
import EditModal from "./assets/EditModal/EditModal";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
  };

  const saveEditedTransaction = (editedTransaction) => {
    setTransactions(transactions.map((tx) => (tx.id === editedTransaction.id ? editedTransaction : tx)));
    setEditingTransaction(null);
  };

  const cancelEditing = () => {
    setEditingTransaction(null);
  };

  const balance = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <div className="balance-box">
        <h3>Saldo</h3>
        <p id="balance">{balance.toFixed(2)} €</p>
      </div>
      <TransactionForm onAddTransaction={addTransaction} />
      <h3>Transactions</h3>
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={startEditing}
      />
      {editingTransaction && (
        <EditModal
          transaction={editingTransaction}
          onSave={saveEditedTransaction}
          onCancel={cancelEditing}
        />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import EditModal from "./components/EditModal";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (description, amount) => {
    const newTx = { id: Date.now(), description, amount: parseFloat(amount) };
    setTransactions([...transactions, newTx]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const openEdit = (tx) => {
    setCurrentEdit(tx);
    setIsModalOpen(true);
  };

  const saveEdit = (id, description, amount) => {
    const updated = transactions.map((tx) =>
      tx.id === id ? { ...tx, description, amount: parseFloat(amount) } : tx
    );
    setTransactions(updated);
    setIsModalOpen(false);
  };

  const balance = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <div className="balance-box">
        <h3>Saldo</h3>
        <p id="balance">{balance.toFixed(2)} €</p>
      </div>
      <TransactionForm onAdd={addTransaction} />
      <h3>Transactions</h3>
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={openEdit}
      />
      {isModalOpen && (
        <EditModal
          transaction={currentEdit}
          onSave={saveEdit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

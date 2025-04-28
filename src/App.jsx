import { useState, useEffect } from "react";
import { db } from "./config/firebase"; // Import Firestore config
import { collection, addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"; // Firestore methods
import TransactionForm from "./assets/TransactionForm/TransactionForm";
import TransactionList from "./assets/TransactionList/TransactionList";
import EditModal from "./assets/EditModal/EditModal";
import MonthlyComparisonChart from "./assets/Chart/MonthlyComparisonChart";  // Assuming this is your chart component
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Fetch transactions from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "transactions"), (querySnapshot) => {
      const fetchedTransactions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(fetchedTransactions);  // Automatically updates state when data changes
    });

    // Cleanup the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Add a transaction to Firestore
  const addTransaction = async (transaction) => {
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        description: transaction.description,
        category: transaction.category,
        amount: parseFloat(transaction.amount),
        date: transaction.date,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Delete a transaction from Firestore
  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  // Start editing a transaction
  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Save the edited transaction to Firestore
  const saveEditedTransaction = async (editedTransaction) => {
    try {
      const transactionRef = doc(db, "transactions", editedTransaction.id);
      await setDoc(transactionRef, editedTransaction);
      setEditingTransaction(null);  // Close the editing modal
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTransaction(null);
  };

  // Calculate the balance
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
      
      {/* Ensure the chart always gets the updated transactions */}
      <div className="chart-container">
        <MonthlyComparisonChart transactions={transactions} />
      </div>
    </div>
  );
}

export default App;

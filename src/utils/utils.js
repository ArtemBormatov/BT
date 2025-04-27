// src/utils/utils.js
export function exportToCSV(transactions) {
    const headers = ['Description', 'Amount', 'Category', 'Date'];
    const rows = transactions.map(transaction => [
      transaction.description,
      transaction.amount.toFixed(2),
      transaction.category,
      transaction.date // Assuming you added date
    ]);
  
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
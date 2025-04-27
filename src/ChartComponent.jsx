// ChartComponent.jsx
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartComponent({ transactions }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Process transactions for monthly income and expenses
    const months = [];
    const incomeData = [];
    const expenseData = [];
    
    // Process each transaction
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear();
      if (!months.includes(month)) months.push(month);
      
      const amount = transaction.amount;
      if (amount > 0) {
        incomeData.push({ month, amount });
      } else {
        expenseData.push({ month, amount });
      }
    });
    
    const monthlyIncome = months.map((month) => 
      incomeData.filter((item) => item.month === month).reduce((acc, item) => acc + item.amount, 0)
    );

    const monthlyExpense = months.map((month) => 
      expenseData.filter((item) => item.month === month).reduce((acc, item) => acc + item.amount, 0)
    );

    setChartData({
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: monthlyIncome,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Expenses',
          data: monthlyExpense,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    });
  }, [transactions]);

  return (
    <div>
      <h2>Monthly Income and Expenses</h2>
      <Line data={chartData} options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Income vs Expense'
          },
          legend: {
            position: 'top',
          },
        },
      }} />
    </div>
  );
}

export default ChartComponent;

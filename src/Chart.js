import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MonthlyComparisonChart({ transactions }) {
  // Helper function to format data by month
  const getMonthlyData = (transactions) => {
    const monthlyIncome = Array(12).fill(0); // Initialize an array for 12 months
    const monthlyExpenses = Array(12).fill(0); // Initialize an array for 12 months

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // Extract the month (0-indexed)

      if (transaction.amount > 0) {
        monthlyIncome[month] += transaction.amount; // Add income
      } else {
        monthlyExpenses[month] += Math.abs(transaction.amount); // Add expense (as positive number)
      }
    });

    return { monthlyIncome, monthlyExpenses };
  };

  const { monthlyIncome, monthlyExpenses } = getMonthlyData(transactions);

  // Data to pass to the chart
  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June", "July", "August", 
      "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Income (€)",
        data: monthlyIncome,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light green for income
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses (€)",
        data: monthlyExpenses,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Light red for expenses
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true, // Ensure the y-axis starts at 0
      },
    },
  };

  return (
    <div className="chart-container" style={{ margin: "20px 0" }}>
      <h2>Monthly Income vs Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default MonthlyComparisonChart;

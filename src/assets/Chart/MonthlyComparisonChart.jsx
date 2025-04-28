// src/assets/Chart/MonthlyComparisonChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyComparisonChart = ({ transactions }) => {
  // Prepare data for the chart
  const getMonthlyData = () => {
    const monthlyData = {
      income: Array(12).fill(0),
      expenses: Array(12).fill(0),
    };

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth(); // Get the month (0-11)

      if (transaction.amount > 0) {
        monthlyData.income[month] += transaction.amount;
      } else {
        monthlyData.expenses[month] += Math.abs(transaction.amount);
      }
    });

    return monthlyData;
  };

  const monthlyData = getMonthlyData();

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ], // X-axis labels for months
    datasets: [
      {
        label: "Income",
        data: monthlyData.income,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for income bars
      },
      {
        label: "Expenses",
        data: monthlyData.expenses,
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Color for expenses bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Income vs. Expenses",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: €${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default MonthlyComparisonChart;

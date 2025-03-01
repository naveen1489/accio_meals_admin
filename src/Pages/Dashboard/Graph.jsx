import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import styles from "../../Styles/StatsCard.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const subscriberData = {
  labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7"],
  datasets: [
    {
      label: "Subscribers",
      data: [5, 10, 15, 20, 18, 12, 8],
      backgroundColor: "#e74c3c",
    },
  ],
};

const partnerData = {
  labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7"],
  datasets: [
    {
      label: "Partners",
      data: [3, 7, 12, 19, 16, 11, 6],
      backgroundColor: "#e74c3c",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.dataset.label}-${tooltipItem.raw}`;
        },
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: true }, beginAtZero: true },
  },
};

const Graph = () => {
  return (
    <div className={styles.container}>
      <div className={styles.graphsWrapper}>
        <div className={styles.graphContainer}>
          <h3 className={styles.title}>Day-wise new subscribers this month</h3>
          <p className={styles.description}>These are some words about this graph.</p>
          <Bar data={subscriberData} options={options} />
        </div>
        <div className={styles.graphContainer}>
          <h3 className={styles.title}>Day-wise new partners this month</h3>
          <p className={styles.description}>These are some words about this graph.</p>
          <Bar data={partnerData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Graph;

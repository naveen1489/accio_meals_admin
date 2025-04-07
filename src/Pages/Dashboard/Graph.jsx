import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../../Styles/StatsCard.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ dashboardData }) => {
  const subscriberData = {
    labels: dashboardData?.dayWiseSubscribers?.map((item) => item.date) || [],
    datasets: [
      {
        label: "Subscribers",
        data:
          dashboardData?.dayWiseSubscribers?.map((item) => item.count) || [],
        backgroundColor: "#e74c3c",
      },
    ],
  };

  const partnerData = {
    labels: dashboardData?.dayWisePartners?.map((item) => item.date) || [],
    datasets: [
      {
        label: "Partners",
        data: dashboardData?.dayWisePartners?.map((item) => item.count) || [],
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
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { display: true },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value; 
          },
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.graphsWrapper}>
        <div className={styles.graphContainer}>
          <h3 className={styles.title}>Day-wise new subscribers this month</h3>
          <p className={styles.description}>
            These are some words about this graph.
          </p>
          <Bar data={subscriberData} options={options} />
        </div>
        <div className={styles.graphContainer}>
          <h3 className={styles.title}>Day-wise new partners this month</h3>
          <p className={styles.description}>
            These are some words about this graph.
          </p>
          <Bar data={partnerData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Graph;

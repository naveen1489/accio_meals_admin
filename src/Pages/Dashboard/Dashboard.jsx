import React, { useEffect } from "react";
import styles from "../../Styles/Dashboard.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import StatsCard from "./StatsCard";
import Graph from "./Graph";
import { useData } from "../../Context/DataProvider";

const Dashboard = () => {
  const { dashboardData, handleDashboardData } = useData();

  useEffect(() => {
    handleDashboardData();
  }, []);

  return (
    <SidebarHeader
      headingText={"Dashboard"}
      subTitle={"Here is the information about all your orders"}
    >
      <div style={{ marginTop: "1rem" }}>
        <StatsCard dashboardData={dashboardData} />

        <Graph dashboardData={dashboardData} />
      </div>
    </SidebarHeader>
  );
};

export default Dashboard;

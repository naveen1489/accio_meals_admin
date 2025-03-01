import React from "react";
import styles from "../../Styles/Dashboard.module.css";
import SidebarHeader from "../../Component/Navigation/SidebarHeader";
import StatsCard from "./StatsCard";
import Graph from "./Graph";

const Dashboard = () => {
  return (
    <SidebarHeader
      headingText={"Dashboard"}
      subTitle={"Here is the information about all your orders"}
    >
      <div style={{ marginTop: "1rem" }}>
       <StatsCard/>

       <Graph/>
      </div>
    </SidebarHeader>
  );
};

export default Dashboard;

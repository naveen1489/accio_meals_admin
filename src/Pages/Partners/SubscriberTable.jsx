import React from "react";
import { Table } from "antd";
import styles from "../../Styles/ViewDetails.module.css";

const columns = [
  {
    title: "SUBSCRIBER NAME",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "PHONE NO",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "ACTION",
    dataIndex: "action",
    key: "action",
    render: (text) => (
      <span style={{ color: "black", fontWeight: "bold" }}>{text}</span>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "Aditya Awdhut Mahya",
    phone: "91888-77758",
    date: "22/08/2025",
    action: "View",
    status: "Active",
  },
  {
    key: "2",
    name: "Rahul Sharma",
    phone: "91234-56789",
    date: "15/07/2025",
    action: "View",
    status: "Inactive",
  },
  {
    key: "3",
    name: "Neha Verma",
    phone: "98765-43210",
    date: "30/06/2025",
    action: "View",
    status: "Active",
  },
  {
    key: "4",
    name: "Vikas Tiwari",
    phone: "90000-11122",
    date: "10/09/2025",
    action: "View",
    status: "completed",
  },
  {
    key: "5",
    name: "Priya Deshmukh",
    phone: "95555-88877",
    date: "05/10/2025",
    action: "View",
    status: "Pending",
  },
];

const SubscriberTable = ({ filter }) => {
  const filteredData = data.filter((item) => {
    if (filter === "all") return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <Table
      className={styles.subscriberTable}
      columns={columns}
      dataSource={filteredData}
      pagination={false}
    />
  );
};

export default SubscriberTable;

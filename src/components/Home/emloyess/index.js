import { Space, Table } from "antd";
import React from "react";

function Employees() {
  const employees = [
    {
      name: "محمد",
      id: "1",
      type: "admin",
    },
    {
      name: "أحمد محمد",
      id: "2",
      type: "employee",
    },
  ];
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "اسم العميل",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الدور",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "أوامر",
      key: "action",
      render: (_, record) => (
        <Space>
          <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            
          </div>
        </Space>
      ),
    },
  ];
  return <Table dataSource={employees} columns={columns}/>;
}

export default Employees;

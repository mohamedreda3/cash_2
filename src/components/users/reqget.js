import { Modal, Space, Table, Input, Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./user.css";

const ReqGet = () => {
  const [getData, setGetData] = useState(null);

  const getRequest = () => {
    axios
      .get(
        "https://ahmed-cash.com/ahmed_cash/admin/select_all_partner_requests.php"
      )
      .then((res) => {
        setGetData(res?.data?.message);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);

  const [withdrawConfirm, setWithDrawConfirm] = useState(false);
  const [balance, setBalance] = useState(0);

  const getWithdrawBalance = (record) => {
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/select_partner_balance.php",
        JSON.stringify({
          partner_id: record?.partner_id,
        })
      )
      .then((res) => {
        if (res.data.status === "success") {
          setBalance(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`بحث ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<i className="fa fa-search" />}
            size="small"
            style={{ width: 90 }}
          >
            بحث
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            إعادة
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <i className="fa fa-filter" style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => document.getElementById("searchInput").select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 4 }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const renderReqdata = [
    {
      title: "الكمية",
      dataIndex: "amount",
      key: "amount",
      ...getColumnSearchProps("amount", "الكمية"),
      render: (_, record) => <Space>{parseFloat(record?.amount) / 100} جنية</Space>,
    },
    {
      title: "تاريخ",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date", "تاريخ"),
    },
    {
      title: "رقم التليفون",
      dataIndex: "vf_number",
      key: "vf_number",
      ...getColumnSearchProps("vf_number", "رقم التليفون"),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "قيد الانتظار", value: "request" },
        { text: "تم الرفض", value: "refused" },
        { text: "تم الاستلام", value: "done" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "أدوات",
      key: "tools",
      render: (_, record) => (
        <Space>
          {record.status === "request" ? (
            <>
              <span
                className="btn btn-success"
                onClick={() => {
                  setWithDrawConfirm(record);
                  getWithdrawBalance(record);
                }}
              >
                تأكيد
              </span>
              <span
                className="btn btn-primary"
                onClick={() => {
                  axios
                    .post(
                      "https://ahmed-cash.com/ahmed_cash/admin/update_withdraw_partners.php",
                      JSON.stringify({
                        withdraw_id: record.withdraw_id,
                        partner_id: record.partner_id,
                        status: "refused",
                      })
                    )
                    .then((res) => {
                      if (res.data.status === "success") {
                        toast.success(res.data.message);
                        setGetData(null);
                        getRequest();
                      } else {
                        toast.error(res.data.message);
                      }
                    });
                }}
              >
                رفض
              </span>
            </>
          ) : null}
        </Space>
      ),
    },
  ];

  return (
    <div className="users_page">
      <Table dataSource={getData} columns={renderReqdata} />
      <Modal
        title="مراجعة طلبات سحب الرصيد"
        visible={withdrawConfirm !== false}
        onCancel={() => setWithDrawConfirm(false)}
        onOk={() => {
          axios
            .post(
              "https://ahmed-cash.com/ahmed_cash/admin/update_withdraw_partners.php",
              JSON.stringify({
                withdraw_id: withdrawConfirm.withdraw_id,
                status: "done",
                partner_id: withdrawConfirm.partner_id,
              })
            )
            .then((res) => {
              if (res.data.status === "success") {
                toast.success(res.data.message);
                setGetData(null);
                getRequest();
              } else {
                toast.error(res.data.message);
              }
            });
        }}
        okText="تأكيد"
        cancelText="رفض"
      >
        الرصيد الذي سيتم سحبه : {parseFloat(balance) / 100} جنية
      </Modal>
    </div>
  );
};

export default ReqGet;

import React, { useEffect, useRef, useState } from "react";
import "./accepted.css";
import { Modal, Select, Space, Table } from "antd";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible, AiOutlineCopy } from "react-icons/ai";
import { Icon } from "@iconify/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { CloseButton } from "reactstrap";
const Accepted = () => {
  const [showconfdialog, setshowconfdialog] = useState(false);

  const [accepted_data, setaccepted_data] = useState(false);
  const [acc_data, setAccData] = useState(accepted_data);
  const [showModel, setShowModel] = useState(false);
  const [modelData, setModelData] = useState(false);
  const renderdata = [
    {
      title: "رقم العمليه",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "الحالة",
      key: "actions",
      render: (_, record) => (
        <Space>
          <div className="actions">
            {record?.status == "cancel" ? (
              <span style={{ color: "#085394" }}> عملية ملغية</span>
            ) : record?.status == "refused" ? (
              <span style={{ color: "red" }}> عملية مرفوضة</span>
            ) : (
              <span style={{ color: "green" }}> عملية ناجحة</span>
            )}
          </div>
        </Space>
      ),
    },

    {
      title: "إرسال من",
      dataIndex: "source_Wallet",
      key: "send",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <img src={record?.source_Wallet.wallet_logo} alt="" />
            <span>{record?.source_Wallet.wallet_name}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "رقم المرسل",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.user_from_id}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "عنوان المرسل",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.source_address}</span>
            <CopyToClipboard
              text={record.source_address}
              onCopy={() => toast.success("تم نسخ الرقم")}
            >
              <AiOutlineCopy style={{ cursor: "pointer" }} />
            </CopyToClipboard>
          </div>
        </Space>
      ),
    },

    {
      title: "رقم محفظة المرسل",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.wallet_from_id}</span>

          </div>
        </Space>
      ),
    },

    {
      title: "إرسال إلي",
      dataIndex: "destination_Wallet",
      key: "send",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <img src={record?.destination_Wallet.wallet_logo} alt="" />
            <span>{record?.destination_Wallet.wallet_name}</span>
          </div>
        </Space>
      ),
    },



    {
      title: "المبلغ المرسل",
      dataIndex: "amount_sent",
      key: "amount_sent",
    },
    {
      title: "المبلغ المستقبل",
      dataIndex: "received_quantity",
      key: "received_quantity",
    },
    {
      title: "التاريخ",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "الوقت",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "سبب الرفض",
      dataIndex: "refused_reason",
      key: "refused_reason",
    },
    {
      title: "تم التحويل بواسطة",
      key: "trans_by",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <span>{record?.userData?.name}</span>
          </div>
        </Space>
      ),
    }, {
      title: "عرض العملية",
      key: "view",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <AiFillEye
              onClick={(e) => {
                setShowModel(true);
                setModelData(record);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Space>
      ),
    }
  ];

  const userDataHeaders = [
    {
      title: "معرف المستخدم",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "تاريخ الانضمام",
      dataIndex: "join_date",
      key: "join_date",
    },
    {
      title: "النوع",
      dataIndex: "type",
      key: "type",
    },
  ];

  const modelrenderdata = [
    {
      title: "رقم العمليه",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "الحالة",
      key: "actions",
      render: (_, record) => (
        <Space>
          <div className="actions">
            {record?.status == "cancel" ? (
              <span style={{ color: "#085394" }}> عملية ملغية</span>
            ) : record?.status == "refused" ? (
              <span style={{ color: "red" }}> عملية مرفوضة</span>
            ) : (
              <span style={{ color: "green" }}> عملية ناجحة</span>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: "إرسال من",
      dataIndex: "source_Wallet",
      key: "send",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <img src={record?.source_Wallet.wallet_logo} alt="" />
            <span>{record?.source_Wallet.wallet_name}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "رقم المرسل",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.user_from_id}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "عنوان المرسل",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.source_address}</span>
            <CopyToClipboard
              text={record.source_address}
              onCopy={() => toast.success("تم نسخ الرقم")}
            >
              <AiOutlineCopy style={{ cursor: "pointer" }} />
            </CopyToClipboard>
          </div>
        </Space>
      ),
    },
    {
      title: "رقم محفظة المرسل",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.wallet_from_id}</span>
          </div>
        </Space>
      ),
    },
    {
      title: "إرسال إلي",
      dataIndex: "destination_Wallet",
      key: "send",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <img src={record?.destination_Wallet.wallet_logo} alt="" />
            <span>{record?.destination_Wallet.wallet_name}</span>
          </div>
        </Space>
      ),
    },
    {
      title: " عنوان المرسل إليه",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.destination_address}</span>
            <CopyToClipboard
              text={record.destination_address}
              onCopy={() => toast.success("تم نسخ الرقم")}
            >
              <AiOutlineCopy style={{ cursor: "pointer" }} />
            </CopyToClipboard>
          </div>
        </Space>
      ),
    },
    {
      title: "المبلغ المرسل",
      dataIndex: "amount_sent",
      key: "amount_sent",
    },
    {
      title: "المبلغ المستقبل",
      dataIndex: "received_quantity",
      key: "received_quantity",
    },
    {
      title: "التاريخ",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "الوقت",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "سبب الرفض",
      dataIndex: "refused_reason",
      key: "refused_reason",
    },
    {
      title: "تم التحويل بواسطة",
      key: "trans_by",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <span>{record?.userData?.name}</span>
          </div>
        </Space>
      ),
    },
  ];

  const [paymentmethods, setpaymentmethods] = useState([
    {
      id: 1,
      name: "فودافون كاش",
      money: "L.E",
      img: require("../../../assets/vodafon.png"),
    },
    {
      id: 2,
      name: "انستا باي",
      money: "L.E",
      img: require("../../../assets/insta.png"),
    },
    {
      id: 3,
      name: "اتصالات كاش",
      money: "L.E",
      img: require("../../../assets/etisalat.png"),
    },
    {
      id: 4,
      name: "اورانج كاش",
      money: "L.E",
      img: require("../../../assets/orange.png"),
    },
    {
      id: 5,
      name: "وي",
      money: "L.E",
      img: require("../../../assets/we.png"),
    },
    {
      id: 6,
      name: "بيرفكت مونى",
      money: "UDS",
      img: require("../../../assets/perfectmo.png"),
    },
    {
      id: 7,
      name: "باير",
      money: "UDS",
      img: require("../../../assets/pyer.png"),
    },
    {
      id: 8,
      name: "اسكريل",
      money: "UDS",
      img: require("../../../assets/skirll.png"),
    },
    {
      id: 9,
      name: "وايز",
      money: "UDS",
      img: require("../../../assets/wise.png"),
    },
    {
      id: 10,
      name: "pyypl",
      money: "UDS",
      img: require("../../../assets/pyyel.png"),
    },
  ]);
  useEffect(() => {
    console.log(modelData);
  }, [modelData])

  const [date, setDate] = useState(false);
  // setDateTo
  const [status, setStatus] = useState(false);
  const options = [
    { value: false, label: "" },
    { value: "done", label: "عملية ناجحة" },
    { value: "refused", label: "عملية مرفوضة" },
    { value: "cancel", label: "عملية ملغاة" },
  ];

  useEffect(() => {
    axios
      .get("https://ahmed-cash.com/ahmed_cash/admin/select_wallets.php")
      .then((res) => {
        if (res.data.status === "success") {
          setpaymentmethods([
            {
              id: "",
              name: false,
              money: "",
              img: "",
              minimum_order_val: false,
            },
            ...res.data.message,
          ]);
        }
      });
  }, []);
  const [showfrom, setshowfrom] = useState(false);
  const [showto, setshowto] = useState(false);

  const [fromdata, setfromdata] = useState("");
  const [todata, settodata] = useState("");

  const [fromname, setfromname] = useState(false);
  const [toname, settoname] = useState(false);

  const [operationnumber, setoperationnumber] = useState("");

  const showModal = () => {
    setshowconfdialog(true);
  };
  const handleOk = () => {
    setshowconfdialog(false);
  };
  const handleCancel = () => {
    setshowconfdialog(false);
  };
  const [dateTo, setDateTo] = useState(false);
  const getData = () => {
    setfromname(false);
    settoname(false);
    axios
      .get(
        "https://ahmed-cash.com/ahmed_cash/admin/select_orders_history.php"
      )
      .then((res) => {
        if (res.data.status == "success") {
          setaccepted_data(res.data.message);
          setAccData(res.data.message);
        }
      });
  };
  const search_filter = useRef();
  const [searchQuery, setSearchQuery] = useState(false);
  useEffect(() => {
    if (accepted_data) {
      setAccData(
        accepted_data.filter(
          (item) =>
            (!date || item.day >= date) &&
            (!status || item.status === status) &&
            (!dateTo || item.date <= dateTo) &&
            (!fromname || item.source_Wallet.wallet_name.includes(fromname)) &&
            (!toname || item.destination_Wallet.wallet_name.includes(toname)) &&
            (!searchQuery || item.order_id == searchQuery)
        )
      );
    }
  }, [date, status, fromname, toname, dateTo, searchQuery]);


  return (
    <div className="accepted_page">
      <div className="filter_accepted">
        <div className="from_pay">
          <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>من:</h5>

          <div className="from_input">
            <input
              value={fromname ? fromname : ""}
              onFocus={() => setshowfrom(true)}
              // onBlur={() => setshowfrom(false)}
              type="text"
              placeholder=""
            />
            {!showfrom ? (
              <img
                onClick={() => {
                  setshowfrom(true);
                }}
                style={{ width: "20px" }}
                src={require("../../../assets/bottomarrow.png")}
                alt=""
              />
            ) : (
              <img
                onClick={() => {
                  setshowfrom(false);
                }}
                style={{ width: "20px" }}
                src={require("../../../assets/uparrow.png")}
                alt=""
              />
            )}
            {fromdata !== "" ? (
              <div className="pay_method pay_input">
                {paymentmethods
                  .filter((it) => it.id * 1 == fromdata * 1)
                  .map((item) => {
                    <div className="pay_method">
                      <img
                        style={{ width: "20px" }}
                        src={item.wallet_logo}
                        alt=""
                      />
                      <h4>{item.wallet_name ? item.wallet_name : ""}</h4>
                      <h6>
                        {item.minimum_order_val && item.minimum_order_val != ""
                          ? "(" + item.minimum_order_val + ")"
                          : "none"}
                      </h6>
                    </div>;
                  })}
              </div>
            ) : null}
            {showfrom ? (
              <div className="pay_methods">
                {paymentmethods.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setfromdata(item.wallet_id);
                        setfromname(item.wallet_name);
                        setshowfrom(false);
                      }}
                      className="pay_method"
                    >
                      <img
                        style={{ width: "20px" }}
                        src={item.wallet_logo}
                        alt=""
                      />
                      <h4>{item.wallet_name ? item.wallet_name : ""}</h4>
                      <h6>
                        {item.minimum_order_val && item.minimum_order_val != ""
                          ? "(" + item.minimum_order_val + ")"
                          : "none"}
                      </h6>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="from_pay">
          <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>إلى:</h5>

          <div className="from_input">
            <input
              value={toname ? toname : ""}
              onFocus={() => setshowto(true)}
              // onBlur={() => setshowto(false)}
              type="text"
              placeholder=""
            />
            {!showto ? (
              <img
                onClick={() => {
                  setshowto(true);
                }}
                style={{ width: "20px" }}
                src={require("../../../assets/bottomarrow.png")}
                alt=""
              />
            ) : (
              <img
                onClick={() => {
                  setshowto(false);
                }}
                style={{ width: "20px" }}
                src={require("../../../assets/uparrow.png")}
                alt=""
              />
            )}
            {todata !== "" ? (
              <div className="pay_method pay_input">
                {paymentmethods
                  .filter((it) => it.id * 1 == fromdata * 1)
                  .map((item) => {
                    <div className="pay_method">
                      <img
                        style={{ width: "20px" }}
                        src={item.wallet_logo}
                        alt=""
                      />
                      <h4>{item.wallet_name ? item.wallet_name : ""}</h4>
                      <h6>
                        ((
                        {item.minimum_order_val && item.minimum_order_val != ""
                          ? "(" + item.minimum_order_val + ")"
                          : "none"}
                        ))
                      </h6>
                    </div>;
                  })}
              </div>
            ) : null}
            {showto ? (
              <div className="pay_methods">
                {paymentmethods.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        settodata(item.wallet_id);
                        settoname(item.wallet_name);
                        setshowto(false);
                      }}
                      className="pay_method"
                    >
                      <img
                        style={{ width: "20px" }}
                        src={item.wallet_logo}
                        alt=""
                      />
                      <h4>{item.wallet_name ? item.wallet_name : ""}</h4>
                      <h6>
                        {item.minimum_order_val && item.minimum_order_val != ""
                          ? "(" + item.minimum_order_val + ")"
                          : "none"}
                      </h6>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
        <form
          className="filterForm"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
        >
          <div className="date_filter">
            <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>من:</h5>
            <input
              type="date"
              onChange={(e) => setDate(e.currentTarget.value)}
              required
            />
          </div>
          <div className="date_filter">
            <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>إلى:</h5>
            <input
              type="date"
              onChange={(e) => setDateTo(e.currentTarget.value)}
              required
            />
          </div>
          <button className="btn btn-success">
            عرض (حدد تاريخ أولا لإظهار العمليات)
          </button>
        </form>
      </div>
      <div className="date_filter">
        <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>
          حالة العملية:
        </h5>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? "grey" : "red",
            }),
          }}
          defaultValue={status}
          onChange={setStatus}
          options={options}
        />
      </div>
      <div className="search_filter">
        <h5 style={{ marginBottom: "10px", fontSize: "18px" }}>رقم العملية</h5>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            ref={search_filter}

          />
          <button className="btn btn-success"
            onClick={() => setSearchQuery(search_filter?.current?.value)}
          > بحث </button>
        </div>
      </div>
      <Table dataSource={acc_data} columns={renderdata} />
      <Modal
        title="تأكيد العمليه"
        open={showconfdialog}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="opertion_form">
          <input
            onChange={(e) => {
              setoperationnumber(e.target.value);
            }}
            type="text"
            placeholder="أدخل رقم العمليه"
          />
        </form>
      </Modal>
      {showModel ? (
        <div className="model">
          <CloseButton
            onClick={() => {
              setShowModel(false);
              setModelData(false);
            }}
          />
          <div className="table_h">
            <h3> تفاصيل العملية </h3>
            <Table dataSource={[modelData]} columns={modelrenderdata} />
          </div>
          <div className="table_h con_img">
            <h3>صورة الوصل</h3>
            <img src={modelData?.user_photo_url} alt="" />
          </div>
          <div className="table_h con_img">
            <h3>تأكيد صورة الوصل</h3>
            <img src={modelData?.confirme_photo_url} alt="" />
          </div>
          <div className="table_h">
            <h3> تفاصيل العميل </h3>
            <Table
              dataSource={[modelData.userData]}
              columns={userDataHeaders}
            />
          </div>



        </div>
      ) : null}
    </div>
  );
};

export default Accepted;

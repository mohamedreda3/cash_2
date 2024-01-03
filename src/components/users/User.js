import { Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./user.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineCopy } from "react-icons/ai";
const User = () => {
  const [orderData, setOrderData] = useState({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showedituser, setshowedituser] = useState(false);
  const [users, setusers] = useState(false);
  const [filterUsers, setFilterUsers] = useState(null);
  const [image, setOnImage] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [showReset, setShowReset] = useState(null);
  const getUsers = () => {
    axios
      .get("https://ahmed-cash.com/ahmed_cash/admin/select_all_users.php")
      .then((res) => {
        if (res.data.status == "success") {
          setusers(res.data.message);
        }
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const [userdata, setuserdata] = useState({
    id: "",
    name: "",
    email: "",
  });
  const showModal = () => {
    setshowedituser(true);
  };
  const handleOk = () => {
    if (userdata.ban == "yes") {
      userdata.status = "no";
    } else {
      userdata.status = "yes";
    }
    const data_send = {
      user_id: userdata.user_id,
      status: userdata.status,
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/block_user.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setshowedituser(false);
          getUsers();
        } else {
          toast.error(res.data.message);
        }
      });
  };
  const reset = () => {
    const data_send = {
      user_id: showReset,
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/reset_user_verification.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowReset(null);
          getUsers();
        } else {
          toast.error(res.data.message);
        }
      });
  };
  const handleCancel = () => {
    setshowedituser(false);
    setuserdata(false);
  };
  const handleCancle = () => {
    setShowTreats(false);
    setUserId(false);
  };
  const [showTreats, setShowTreats] = useState(false);
  const renderusers = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "المعاملات السابقة",
      render: (_, record) => (
        <Space>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowTreats(true);
              setUserId(record.user_id);
            }}
          >
            عرض
          </button>
        </Space>
      ),
    },
    {
      title: "الهوية",
      render: (_, record) => (
        <Space>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowReset(record?.user_id);
            }}
          >
            الغاء تأكيد الهوية
          </button>
        </Space>
      ),
    },
    {
      title: "الاسم",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الاسم بالبطاقة",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "الرقم القومي",
      dataIndex: "n_id",
      key: "n_id",
    },
    {
      title: "صورة البطاقة",
      key: "confirm_identity_front",
      render: (_, record) => (
        <Space>
          <img
            style={{ height: "200px" }}
            src={record?.confirm_identity_front}
            alt=""
            onClick={() => setOnImage(record?.confirm_identity_front)}
          />
        </Space>
      ),
    },
    {
      title: "البريد الإلكترونى",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "دور المستخدم",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "تاريخ الانضمام",
      dataIndex: "join_date",
      key: "join_date",
    },
    {
      title: "الحاله",
      key: "status",
      render: (_, record) => (
        <Space>
          {record.ban == "yes" ? (
            <img
              style={{ width: "30px" }}
              src={require("../../assets/stban.png")}
              alt=""
            />
          ) : (
            <img
              style={{ width: "30px" }}
              src={require("../../assets/unban.png")}
              alt=""
            />
          )}
        </Space>
      ),
    },
    {
      title: "أوامر",
      key: "action",
      render: (_, record) => (
        <Space>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            {record.ban == "yes" ? (
              <img
                onClick={() => {
                  setshowedituser(true);
                  setuserdata({ ...record });
                }}
                style={{ width: "30px", cursor: "pointer" }}
                src={require("../../assets/unban.png")}
                alt=""
              />
            ) : (
              <img
                onClick={() => {
                  setshowedituser(true);
                  setuserdata({ ...record });
                }}
                style={{ width: "30px" }}
                src={require("../../assets/ban.png")}
                alt=""
              />
            )}
          </div>
        </Space>
      ),
    },
  ];

  const [userId, setUserId] = useState(false);
  const [acc_data, setAccData] = useState(false);
  // acc_data
  const renderdata = [
    {
      title: "رقم العمليه",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "عرض",
      key: "trans_by",
      render: (_, record) => (
        <Space>
          <button
            onClick={() => {
              setOrderData(record);
              setShowOrderModal(true);
            }}
            className="btn btn-primary"
          >
            عرض
          </button>
        </Space>
      ),
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
  const getPrevTreats = async () => {
    console.log(userId);
    const prevTreats = await axios.post(
      "https://ahmed-cash.com/ahmed_cash/user/select_my_order.php",
      { user_id: userId }
    );
    console.log(prevTreats);
    setAccData(prevTreats?.data?.message);
  };

  useEffect(() => {
    if (userId) {
      getPrevTreats();
    }
  }, [userId]);

  useEffect(() => {
    if (users && users?.length)
      if (searchValue && searchValue?.length)
        setFilterUsers(
          users.filter((item) => {
            return (
              item.name?.includes(searchValue) ||
              item.full_name?.includes(searchValue) ||
              item.email?.includes(searchValue)
            );
          })
        );
      else setFilterUsers(users && users?.length ? [...users] : []);
  }, [searchValue, users]);

  return (
    <div className="users_page">
      <div className="rowdiv">
        <label htmlFor="">بحث</label>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      <Table dataSource={filterUsers} columns={renderusers} />
      <Modal
        title="تعديل البيانات"
        open={showedituser}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {userdata.ban == "no" ? (
          <h4>هل أنت متأكد من حظر المستخدم ؟</h4>
        ) : (
          <h4>هل أنت متأكد من تنشيط المستخدم ؟</h4>
        )}
      </Modal>
      <Modal
        title=""
        open={showReset}
        onOk={reset}
        onCancel={() => setShowReset(false)}
      >
        <h4>هل أنت متأكد من إلغاء الهوية ؟</h4>
      </Modal>
      <Modal
        title="صورة البطاقة"
        open={image}
        onOk={() => setOnImage(null)}
        onCancel={() => setOnImage(null)}
      >
        <img src={image} alt="" style={{ width: "100%" }} />
      </Modal>
      <Modal
        title="المعاملات السابقة"
        open={showTreats}
        onOk={handleCancle}
        onCancel={handleCancle}
      >
        <div className="user_data">
          <Table dataSource={acc_data} columns={renderdata} />
        </div>
      </Modal>
      <Modal
        title="تفاصيل الطلب"
        open={showOrderModal}
        onOk={() => {
          setShowOrderModal(false);
        }}
        onCancel={() => {
          setShowOrderModal(false);
        }}
      >
        {" "}
        {console.log(orderData)}
        <div className="row">
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              المبلغ المرسل:
            </label>
            <div className="bg-light p-2">{orderData.amount_sent}</div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              المبلغ المستلم:
            </label>
            <div className="bg-light p-2">
              {(orderData.received_quantity * 1).toFixed(1)}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              التاريخ:
            </label>
            <div className="bg-light p-2">{orderData.day}</div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              الوقت:
            </label>
            <div className="bg-light p-2">{orderData.time}</div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              الحاله:
            </label>
            <div className="bg-light p-2">
              <div className="actions">
                {orderData?.status == "cancel" ? (
                  <span style={{ color: "#085394" }}> عملية ملغية</span>
                ) : orderData?.status == "refused" ? (
                  <span style={{ color: "red" }}> عملية مرفوضة</span>
                ) : (
                  <span style={{ color: "green" }}> عملية ناجحة</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              عنوان المرسل:
            </label>
            <div
              style={{ gap: "10px", display: "flex", alignItems: "center" }}
              className="bg-light p-2"
            >
              {orderData?.source_address}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              عنوان المرسل إليه:
            </label>
            <div
              style={{ gap: "10px", display: "flex", alignItems: "center" }}
              className="bg-light p-2"
            >
              {orderData?.destination_address}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              رقم محفظه المرسل:
            </label>
            <div
              style={{ gap: "10px", display: "flex", alignItems: "center" }}
              className="bg-light p-2"
            >
              {orderData?.wallet_from_id}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              إرسال من:
            </label>
            <div
              style={{ gap: "10px", display: "flex", alignItems: "center" }}
              className="bg-light p-2"
            >
              <img
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                src={orderData?.source_Wallet?.wallet_logo}
                alt=""
              />
              <span>{orderData?.source_Wallet?.wallet_name}</span>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 my-2">
            <label className="mb-1" htmlFor="">
              إرسال إلى:
            </label>
            <div
              style={{ gap: "10px", display: "flex", alignItems: "center" }}
              className="bg-light p-2"
            >
              <img
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                src={orderData?.destination_Wallet?.wallet_logo}
                alt=""
              />
              <span>{orderData?.destination_Wallet?.wallet_name}</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default User;

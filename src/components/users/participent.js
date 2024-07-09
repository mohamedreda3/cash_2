import { Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ImageViewer from "react-simple-image-viewer";
import "./user.css";
const Participent = () => {
  const navigate = useNavigate();
  const [showUserDataInfo, setShowUserDataInfo] = useState(false);
  const [userData, setUserData] = useState({});
  const [wallets, setwallets] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showedituser, setshowedituser] = useState(false);
  const [users, setusers] = useState(false);
  const [joinRequest, setJoinRequest] = useState(false);
  const [openWaslSoura, setOpenWaslSoura] = useState(null);
  const [soura, setSoura] = useState(null);

  const [filterUsers, setFilterUsers] = useState(null);
  const [image, setOnImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const [specifyPercetage, setSpecifyPercentage] = useState(null);
  const [requestGet, setRequestGet] = useState(null);
  const [getData, setGetData] = useState(null);
  const [showReset, setShowReset] = useState(null);
  const openImageViewer = useCallback((index) => {
    // console.log(index)
    setCurrentImage(index);
    console.log(index);
    setIsViewerOpen(true);
  }, []);

  const getRequest = () => {
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/select_partner_requests_data.php",
        {
          partner_id: requestGet?.user_id,
        }
      )
      .then((res) => {
        setGetData(res?.data?.message?.filter(item=>item?.status == "request"));
      });
  };

  useEffect(() => {
    if (requestGet) {
      getRequest();
    }
  }, [requestGet]);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
    setOpenWaslSoura(null)
    setSoura(null)
  };
  const getUsers = () => {
    axios
      .get("https://ahmed-cash.com/ahmed_cash/admin/select_partners.php")
      .then((res) => {
        if (res.data.status == "success") {
          setusers(res.data.message);
        }
      });
  };

  const getwallets = () => {
    axios
      .get("https://ahmed-cash.com/ahmed_cash/admin/select_wallets.php")
      .then((res) => {
        setwallets(res.data.message);
      });
  };

  useEffect(() => {
    getwallets();
  }, []);
  const requestIdentify = (id, ask_veri) => {
    axios
      .post("https://ahmed-cash.com/ahmed_cash/admin/ask_verification.php", {
        user_id: id,
        ask_veri: ask_veri === "0" ? "1" : "0",
      })
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res?.data?.message);
          setShowUserDataInfo(false);
          getUsers();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => console.log(err));
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
  const [balance, setBalance] = useState(0);
  const getWithdrawBalance = (withdrawConfirm) => {
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/select_partner_balance.php",
        JSON.stringify({
          partner_id: withdrawConfirm?.partner_id,
        })
      )
      .then((res) => {
        if (res.data.status == "success") {
          setBalance(res.data.message);
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
  const [withdrawConfirm, setWithDrawConfirm] = useState(false);
  const renderReqdata = [
    {
      title: "الكمية",
      dataIndex: "amount",
      render: (_, record) => (
        <Space>{parseFloat(record?.amount) / 100} جنية</Space>
      ),
    },
    {
      title: "تاريخ",
      dataIndex: "date",
    },
    {
      title: "رقم التليفون",
      dataIndex: "vf_number",
    },
    {
      title: "الحالة",
      dataIndex: "status",
    },
    {
      title: "أدوات",
      render: (_, record) => (
        <Space>
          <span
            className="btn btn-success"
            onClick={() => {
              setWithDrawConfirm((prev) => ({ ...prev, ...record }));
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
                    status: "refused",
                    partner_id: record.partner_id,
                  })
                )
                .then((res) => {
                  if (res.data.status == "success") {
                    toast.success(res.data.message);
                    setRequestGet(null);
                    getRequest();
                  } else {
                    toast.error(res.data.message);
                  }
                });
            }}
          >
            رفض
          </span>
        </Space>
      ),
    },
  ];
  const renderusers = [
    {
      title: "#",
      dataIndex: "user_id",
      key: "user_id",
    },

    // {
    //   title: "الهوية",
    //   render: (_, record) => <Space></Space>,
    // },
    {
      title: "الاسم",
      render: (_, record) => (
        <Space>
          <span>{record?.user_data?.name}</span>
        </Space>
      ),
    },

    {
      title: "رقم الهاتف",
      render: (_, record) => (
        <Space>
          <span>{record?.user_data?.phone}</span>
        </Space>
      ),
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "صورة البطاقة",
      dataIndex: "phone",
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
            <img
              src={record?.identity}
              alt=""
              width={60}
              style={{cursor:"pointer"}}
              height={60}
              onClick={() => {
                setSoura(record?.identity);
                setOpenWaslSoura(true);
              }}
            />
          </div>
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
            {/* <button
              className="btn btn-success"
              onClick={() => {
                setSpecifyPercentage(record);
              }}
            >
              تحديد نسبة
            </button> */}
            {!record?.participent ? (
              <>
                {" "}
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setRequestGet(record);
                  }}
                >
                  طلبات السحب
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    navigate("/history/" + record?.user_id);
                  }}
                >
                  سجل التحويلات
                </button>
              </>
            ) : null}
            {record?.participent ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  setJoinRequest(record);
                }}
              >
                مراجعة طلب الانضمام
              </button>
            ) : null}
          </div>
        </Space>
      ),
    },
  ];

  const [userId, setUserId] = useState(false);

  useEffect(() => {
    setFilterUsers(users && users?.length ? [...users] : []);
  }, [users]);
  const filterUser = () => {
    if (users && users?.length)
      if (searchValue && searchValue?.length)
        setFilterUsers(
          users.filter((item) => {
            return (
              item.name?.includes(searchValue) ||
              item.full_name?.includes(searchValue) ||
              item.email?.includes(searchValue) ||
              item.user_id == searchValue ||
              item.phone == searchValue ||
              item?.n_id == searchValue
            );
          })
        );
      else setFilterUsers(users && users?.length ? [...users] : []);
  };

  useEffect(() => {
    if (!searchValue || !searchValue.length)
      setFilterUsers(users && users?.length ? [...users] : []);
  }, [searchValue]);
  return (
    <div className="users_page">
      <div className="rowdiv">
        <label htmlFor="">بحث</label>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
        <button className="btn btn-primary" onClick={() => filterUser()}>
          بحث
        </button>
      </div>
      <Table dataSource={filterUsers} columns={renderusers} />

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
        title="سحب الرصيد"
        open={specifyPercetage}
        onCancel={() => {
          setSpecifyPercentage(false);
        }}
        onOk={() => {
          setSpecifyPercentage(false);
        }}
      >
        <p>المحفظة: </p>
        <p>المبلغ: </p>
      </Modal>
      <Modal
        title="مراجعة طلبات سحب الرصيد"
        open={requestGet}
        onCancel={() => {
          setRequestGet(false);
        }}
        onOk={() => {
          setRequestGet(false);
        }}
        okText={"تأكيد"}
        cancelText={"إلغاء"}
      >
        <Table
          dataSource={getData && getData?.length ? getData : []}
          columns={renderReqdata}
        />
      </Modal>
      <Modal
        title="مراجعة طلبات سحب الرصيد"
        open={withdrawConfirm}
        onCancel={() => {
          setWithDrawConfirm(false);
        }}
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
              if (res.data.status == "success") {
                toast.success(res.data.message);
                setRequestGet(null);
                getRequest();
              } else {
                toast.error(res.data.message);
              }
            });
        }}
        okText={"تأكيد"}
        cancelText={"رفض"}
      >
        الرصيد الذي سيتم سحبه : {parseFloat(balance) / 100}جنية
      </Modal>

      {openWaslSoura && (
        <ImageViewer
          src={[soura]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default Participent;

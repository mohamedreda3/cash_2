import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Select, Space, Table } from "antd";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible, AiOutlineCopy } from "react-icons/ai";
import { Icon } from "@iconify/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { CloseButton } from "reactstrap";
import ImageViewer from "react-simple-image-viewer";
import { useNavigate, useParams } from "react-router";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
const History = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [showconfdialog, setshowconfdialog] = useState(false);
  const [showUserDataInfo, setShowUserDataInfo] = useState(false);
  const [accepted_data, setaccepted_data] = useState(false);
  const [acc_data, setAccData] = useState(accepted_data);
  const [showModel, setShowModel] = useState(false);
  const [modelData, setModelData] = useState(false);
  const [userData, setUserData] = useState({});
  const renderdata = [
    {
      title: "رقم العمليه",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "الحالة",
      key: "actions",
      render: (_, record) => (
        <Space>
          <div className="actions">
            {record?.order_data?.status == "cancel" ? (
              <span style={{ color: "#085394" }}> عملية ملغية</span>
            ) : record?.order_data?.status == "refused" ? (
              <span style={{ color: "red" }}> عملية مرفوضة</span>
            ) : (
              <span style={{ color: "green" }}> عملية ناجحة</span>
            )}
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
            <span>{record?.order_data?.user_from_id}</span>
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
            <span>{record?.order_data?.source_address}</span>
            <CopyToClipboard
              text={record?.order_data?.source_address}
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
            <span>{record?.order_data?.wallet_from_id}</span>
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
      title: "الأموال المكتسبة",
      dataIndex: "partner_money",
      key: "partner_money",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <span>{parseInt(record?.partner_money)/100}جنية</span>
          </div>
        </Space>
      ),
    },
   
    {
      title: "تم التحويل بواسطة",
      key: "trans_by",
      render: (_, record) => (
        <Space>
          <div className="wallet_data">
            <span>{record?.order_data?.userData?.name}</span>
          </div>
        </Space>
      ),
    },
  
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
    {
      title: "تفاصيل العميل",
      dataIndex: "type",
      key: "type",
      render: (_, record) => {
        return (
          <AiFillEye
            onClick={(e) => {
              // console.log(record)
              setShowUserDataInfo(true);
              setUserData(record);
              // navigate("/userdata",{state:{userData:record}})
            }}
            style={{ cursor: "pointer", fontSize: "22px" }}
          />
        );
      },
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
      img: require("../../assets/vodafon.png"),
    },
    {
      id: 2,
      name: "انستا باي",
      money: "L.E",
      img: require("../../assets/insta.png"),
    },
    {
      id: 3,
      name: "اتصالات كاش",
      money: "L.E",
      img: require("../../assets/etisalat.png"),
    },
    {
      id: 4,
      name: "اورانج كاش",
      money: "L.E",
      img: require("../../assets/orange.png"),
    },
    {
      id: 5,
      name: "وي",
      money: "L.E",
      img: require("../../assets/we.png"),
    },
    {
      id: 6,
      name: "بيرفكت مونى",
      money: "UDS",
      img: require("../../assets/perfectmo.png"),
    },
    {
      id: 7,
      name: "باير",
      money: "UDS",
      img: require("../../assets/pyer.png"),
    },
    {
      id: 8,
      name: "اسكريل",
      money: "UDS",
      img: require("../../assets/skirll.png"),
    },
    {
      id: 9,
      name: "وايز",
      money: "UDS",
      img: require("../../assets/wise.png"),
    },
    {
      id: 10,
      name: "pyypl",
      money: "UDS",
      img: require("../../assets/pyyel.png"),
    },
  ]);
  const openImageViewer = useCallback((index) => {
    // console.log(index)
    setCurrentImage(index);
    console.log(index);
    setIsViewerOpen(true);
  }, []);
  const [soura, setSoura] = useState(null);
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
    setOpenWaslSoura(null);
    setSoura(null);
  };
  useEffect(() => {
    console.log(modelData);
  }, [modelData]);

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
  const [openWaslSoura, setOpenWaslSoura] = useState(null);
  const [dateTo, setDateTo] = useState(false);
  const getData = () => {
    setfromname(false);
    settoname(false);
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/select_partner_trans_history.php",
        {
          partner_id: id,
        }
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
    getData()
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
            <img
              src={modelData?.user_photo_url}
              alt=""
              onClick={() => {
                setSoura(modelData?.user_photo_url);
                setOpenWaslSoura(true);
              }}
            />
          </div>

          <div className="table_h con_img">
            <h3>تأكيد صورة الوصل</h3>
            <img
              src={modelData?.confirme_photo_url}
              alt=""
              onClick={() => {
                setSoura(modelData?.confirme_photo_url);
                setOpenWaslSoura(true);
              }}
            />
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
      {openWaslSoura && (
        <ImageViewer
          src={[soura]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
      <Modal
        title="بيانات العميل"
        open={showUserDataInfo}
        onOk={() => {
          setShowUserDataInfo(false);
        }}
        onCancel={() => {
          setShowUserDataInfo(false);
        }}
      >
        <div className="user_data_comp">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                openImageViewer(0);
              }}
            >
              <TransformWrapper>
                <TransformComponent>
                  <img
                    style={{
                      width: "200px",
                      height: "100px",
                      margin: "auto",
                      display: "block",
                    }}
                    src={userData.confirm_identity_front}
                    alt="test"
                  />
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
          <>
            <div>
              <h4>إسم الشخص: </h4>
              <p>{userData.full_name}</p>
            </div>
            <div>
              <h4>البريد الإلكترونى: </h4>
              <p>{userData.email}</p>
            </div>
            <div>
              <h4>تاريخ الإنضمام: </h4>
              <p>{userData.join_date}</p>
            </div>
            <div>
              <h4>رقم الهاتف: </h4>
              <p>{userData.phone}</p>
            </div>
            <div>
              <h4>الرقم القومى: </h4>
              <p>{userData.n_id}</p>
            </div>
          </>
        </div>
        {isViewerOpen && (
          <ImageViewer
            src={[userData.confirm_identity_front]}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </Modal>
    </div>
  );
};

export default History;

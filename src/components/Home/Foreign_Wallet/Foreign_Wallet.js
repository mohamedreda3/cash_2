import React, { useEffect, useRef, useState } from "react";
import "./accepted.css";
import { Modal, Select, Space, Table } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible, AiOutlineCopy } from "react-icons/ai";
import { Icon } from "@iconify/react";
import CopyToClipboard from "react-copy-to-clipboard";
const Foreign_Wallet = () => {
  const [wallets, setwallets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const walletStatus = useRef();
  const [updatewallet2, setupdatewallet2] = useState({
    wallet_id: "",
    status: "",
  });
  const handleEdit = async () => {
    setIsModalOpen2(false);
    updatewallet2.status = walletStatus.current.status.value;
    await axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/set_wallet_hidden_value.php",
        JSON.stringify(updatewallet2)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          getwallets();
        } else if (res.data.status == "error") {
          toast.err(res.data.message);
        } else {
          toast.error("حدث خطأ ما");
        }
      });
  };
  const [walletdata, setwalletdata] = useState({
    wallet_name: "",
    wallet_logo: "",
    rate: "",
    minimum_order_val: "",
    sell_rate: "",
    buy_rate: "",
    transfare_to_address: "",
  });
  const [logoimg, setlogogimg] = useState(null);
  const [updatewallet, setupdatewallet] = useState({
    wallet_id: "",
    rate: "",
    minimum_order_val: "",
    sell_rate: "",
    buy_rate: "",
    transfare_to_address: ""
  });
  const renderdata = [
    {
      title: "#",
      dataIndex: "wallet_id",
      key: "id",
    },
    {
      title: "اسم الحفظة",
      dataIndex: "wallet_name",
      key: "wallet_name",
    },
    {
      title: "لوجو الحفظة",
      key: "img",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <img
              style={{ width: "60px", cursor: "pointer" }}
              src={record.wallet_logo}
              alt=""
            />
          </div>
        </Space>
      ),
    },
    {
      title: "الحاله",
      key: "hidden",
      render: (_, record) => (
        <Space>
          {record.hidden == "yes" ? (
            <span style={{ color: "red" }}> موقوفة </span>
          ) : record.hidden == "no" ? (
            <span style={{ color: "green" }}> متاحة </span>
          ) : (
            <span style={{ color: "orange" }}> موقوفة مؤقتا</span>
          )}
        </Space>
      ),
    },
    {
      title: "قيمة العملة",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "قيمة الشراء",
      dataIndex: "sell_rate",
      key: "sell_rate",
    },
    {
      title: "قيمة البيع",
      dataIndex: "buy_rate",
      key: "buy_rate",
    },
    {
      title: "أقل كمية",
      dataIndex: "minimum_order_val",
      key: "minimum_order_val",
    },
    {
      title: "عنوان المحفظة",
      key: "address",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <span>{record.transfare_to_address}</span>
            <CopyToClipboard
              text={record.transfare_to_address}
              onCopy={() => toast.success("تم نسخ الرقم")}
            >
              <AiOutlineCopy style={{ cursor: "pointer" }} />
            </CopyToClipboard>
          </div>
        </Space>
      ),
    },
    {
      title: "أوامر",
      key: "actions",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <img
              onClick={() => {
                setIsModalOpen(true);
                setupdatewallet({
                  wallet_id: record.wallet_id,
                  rate: record.rate,
                  minimum_order_val: record.minimum_order_val,
                  wallet_name: record.wallet_name,
                  sell_rate: record.sell_rate,
                  buy_rate: record.buy_rate,
                });

              }}
              style={{ width: "30px", cursor: "pointer" }}
              src={require("../../../assets/edit.png")}
              alt=""
            />
            <Icon
              onClick={() => {
                setIsModalOpen2(true);
                setupdatewallet2({
                  wallet_id: record.wallet_id,
                  status: record.status,
                });
              }}
              style={{ cursor: "pointer", margin: "0 10px" }}
              icon="tabler:status-change"
            />
          </div>
        </Space>
      ),
    },
  ];

  const [paymentmethods, setpaymentmethods] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  const handleuploadimg = () => {
    const formdata = new FormData();
    formdata.append("image", logoimg);
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/item_img_uploader.php",
        formdata
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("تم الرفع بنجاح");
          setwalletdata({ ...walletdata, wallet_logo: res.data.message });
        } else if (res.data.status == "error") {
          toast.error("لم تتم الاضافه");
        } else {
          toast.error("حدث خطأ ما");
        }
      });
  };

  const addwallet = () => {
    const data_send = {
      ...walletdata,
      type: "foreign",
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/add_wallet.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("تمت الاضافه");
          getwallets();
          setShowAdd(false);
        } else if (res.data.status == "error") {
          toast.error("لم تتم الاضافه");
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((err) => console.log(err));
  };

  const getwallets = () => {
    axios
      .get("https://ahmed-cash.com/ahmed_cash/admin/select_wallets.php")
      .then((res) => {
        setwallets(res.data.message);
        setpaymentmethods(
          res.data.message.filter((item) => item.type == "foreign")
        );
      });
  };

  useEffect(() => {
    getwallets();
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
    const data_send = {
      ...updatewallet,
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/update_wallet.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          getwallets();
        } else if (res.data.status == "error") {
          toast.err(res.data.message);
        } else {
          toast.error("حدث خطأ ما");
        }
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="accepted_page">
      <button className="btn-o btn-primary" onClick={() => setShowAdd(true)}>
        إضافة محفظة
      </button>
      {showAdd ? (
        <form
          className="ac_form"
          onSubmit={(e) => {
            e.preventDefault();
            addwallet();
          }}
        >
          <span onClick={() => setShowAdd(false)}> إغلاق </span>
          <div>
            <label for="para1">اسم المحفظة</label>
            <input
              onChange={(e) => {
                setwalletdata({ ...walletdata, wallet_name: e.target.value });
              }}
              type="text"
              id="para1"
            />
          </div>
          <div>
            <label for="para1">عنوان المحفظة</label>
            <input
              onChange={(e) => {
                setwalletdata({ ...walletdata, transfare_to_address: e.target.value });
              }}
              type="text"
              id="para1"
            />
          </div>
          {/* transfare_to_address */}
          <div className="walogo">
            <label for="para2"> شعار المحفظة </label>
            <input
              onChange={(e) => {
                setlogogimg(e.target.files[0]);
              }}
              type="file"
              id="para2"
            />
            <img
              onClick={() => {
                handleuploadimg();
              }}
              src={require("../../../assets/upload.png")}
              alt=""
            />
          </div>
          <div>
            <label for="para2"> قيمة تغيير العملة </label>
            <input
              onChange={(e) => {
                setwalletdata({ ...walletdata, rate: e.target.value });
              }}
              type="text"
              id="para2"
            />
          </div>
          <div>
            <label for="para2"> قيمة الشراء </label>
            <input
              onChange={(e) => {
                setwalletdata({ ...walletdata, sell_rate: e.target.value });
              }}
              type="text"
              id="para2"
            />
          </div>
          <div>
            <label for="para2"> قيمة البيع </label>
            <input
              onChange={(e) => {
                setwalletdata({ ...walletdata, buy_rate: e.target.value });
              }}
              type="text"
              id="para2"
            />
          </div>
          <div>
            <label for="para2"> أقل قيمه للتحويل من المحفظة بالدولار</label>
            <input
              onChange={(e) => {
                setwalletdata({
                  ...walletdata,
                  minimum_order_val: e.target.value,
                });
              }}
              type="text"
              id="para2"
            />
          </div>
          <button className="btn btn-primary">إضافة</button>
        </form>
      ) : null}
      <Table dataSource={paymentmethods} columns={renderdata} />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="updateformwallet">

          <div>
            <h5> قيمة تغيير العملة </h5>
            <input
              onChange={(e) => {
                setupdatewallet({ ...updatewallet, rate: e.target.value });
              }}
              type="text"
              value={updatewallet.rate}
            />
          </div>
          <div>
            <h5> قيمة الشراء  </h5>
            <input
              onChange={(e) => {
                setupdatewallet({ ...updatewallet, sell_rate: e.target.value });
              }}
              type="text"
              value={updatewallet.sell_rate}
            />
          </div>
          <div>
            <h5> قيمة البيع  </h5>
            <input
              onChange={(e) => {
                setupdatewallet({ ...updatewallet, buy_rate: e.target.value });
              }}
              type="text"
              value={updatewallet.buy_rate}
            />
          </div>
          <div>
            <h5>اقل قيمه يمكن التحويل من المحفظة بالدولار</h5>
            <input
              onChange={(e) => {
                setupdatewallet({
                  ...updatewallet,
                  minimum_order_val: e.target.value,
                });
              }}
              type="text"
              value={updatewallet.minimum_order_val}
            />
          </div>
        </form>
      </Modal>
      <Modal
        title="اختيار حالة المحفظة"
        style={{
          top: 20,
        }}
        open={isModalOpen2}
        onOk={() => handleEdit()}
        onCancel={() => setIsModalOpen2(false)}
      >
        <form action="#" id="order-status-form" ref={walletStatus}>
          <label>
            <input type="radio" name="status" value="no" />
            <span id="no"> متاحة</span>
          </label>
          <label>
            <input type="radio" name="status" value="yes" />
            <span id="yes"> موقوفة</span>
          </label>
          <label>
            <input type="radio" name="status" value="for_time" />
            <span id="for_time"> موقوفة مؤقتا</span>
          </label>
        </form>
      </Modal>
    </div>
  );
};

export default Foreign_Wallet;

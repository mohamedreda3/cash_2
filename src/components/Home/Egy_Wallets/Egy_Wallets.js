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
  const walletStatus = useRef();
  const [updatewallet, setupdatewallet] = useState({
    wallet_id: "",
    status: "",
  });
  const handleEdit = async () => {
    setIsModalOpen(false);
    updatewallet.status = walletStatus.current.status.value;
    await axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/set_wallet_hidden_value.php",
        JSON.stringify(updatewallet)
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
    walletStatus.current.status.value = "";
  };
  const [walletdata, setwalletdata] = useState({
    wallet_name: "",
    wallet_logo: "",
    type: "foreign",
    rate: "",
    minimum_order_val: "",
    transfare_to_address: ""
  });
  const [logoimg, setlogogimg] = useState(null);

  const renderdata = [
    {
      title: "#",
      dataIndex: "wallet_id",
      key: "id",
    },
    {
      title: "اسم المحفظة",
      dataIndex: "wallet_name",
      key: "wallet_name",
    },
    {
      title: "شعار المحفظة",
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
              <AiOutlineCopy />
            </CopyToClipboard>
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
            <span style={{ color: "#008000" }}> متاحة </span>
          ) : (
            <span style={{ color: "orange" }}> موقوفة مؤقتا</span>
          )}
        </Space>
      ),
    },
    {
      title: "أقل كمية",
      dataIndex: "minimum_order_val",
      key: "minimum_order_val",
    },
    {
      title: "أوامر",
      key: "actions",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <img
              onClick={() => {
                setEdit(true);
                setItem(record);
              }}
              style={{ width: "30px", cursor: "pointer" }}
              src={require("../../../assets/edit.png")}
              alt=""
            />
            <Icon
              onClick={() => {
                setIsModalOpen(true);
                setupdatewallet({
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
      type: "egyptian",
      rate: "1",
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/add_wallet.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("تمت الاضافه");
          setShowAdd(false);
          getwallets();
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
          res.data.message.filter((item) => item.type == "egyptian")
        );
      });
  };

  useEffect(() => {
    getwallets();
  }, []);

  const [item, setItem] = useState(false);
  const [edit, setEdit] = useState(false);
  const valueInput = useRef();
  const editWallet = () => {
    const data_send = {
      minimum_order_val: valueInput?.current?.value,
      wallet_id: item?.wallet_id
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
  }

  useEffect(() => {
    if (item && [item].length) {
      valueInput.current.value = item?.minimum_order_val
    }
  }, [item])


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
            <label for="para2"> أقل قيمه تحويل من وإلى المحفظة بالجنية</label>
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
      {
        <Modal
          title="اختيار حالة المحفظة"
          style={{
            top: 20,
          }}
          open={isModalOpen}
          onOk={() => handleEdit()}
          onCancel={() => setIsModalOpen(false)}
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
      }

      <Modal
        title="اختيار حالة المحفظة"
        style={{
          top: 20,
        }}
        open={edit}
        onOk={() => editWallet()}
        onCancel={() => setEdit(false)}
      >
        <form className="updateformwallet" onSubmit={(e) => {
          e.preventDefault();
        }}>
          <div>
            <h5>اقل قيمه يمكن التحويل من المحفظة بالجنية</h5>
            <input
              ref={valueInput}
              type="text"
            />
          </div>
        </form>
      </Modal>
      <Table dataSource={paymentmethods} columns={renderdata} />
    </div>
  );
};

export default Foreign_Wallet;

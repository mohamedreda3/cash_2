import React, { useEffect, useState } from "react";
import "./accepted.css";
import { Modal, Select, Space, Table } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const SocialMedia = () => {
  const [socials, setsocials] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [socialdata, setsocialdata] = useState({
    social_name: "",
    social_logo: "",
    type: "foreign",
    rate: "",
    minimum_order_val: "",
  });
  const [logoimg, setlogogimg] = useState(null);
  const renderdata = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "اسم الموقع ",
      key: "img",
      render: (_, record) => (
        <Space>
          <a
            style={{ color: "black", textDecoration: "none" }}
            href={record.link}
            target="_blanck"
          >
            {record.name}
          </a>
        </Space>
      ),
    },
    {
      title: "شعار الموقع ",
      key: "img",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <img
              style={{ width: "60px", cursor: "pointer" }}
              src={record.image}
              alt=""
            />
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
            <AiFillDelete
              onClick={() => {
                setSocialId(record.social_id);
                setShowDeleteModel(true);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </Space>
      ),
    },
  ];
  const [socialId, setSocialId] = useState(false);
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const handleDelete = () => {
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/delete_social_acc.php",
        JSON.stringify({ social_id: socialId })
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setShowDeleteModel(false);
          getsocials();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const [socialaccs, setSocialaccs] = useState([]);

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
          setsocialdata({ ...socialdata, image: res.data.message });
        } else if (res.data.status == "error") {
          toast.error("لم تتم الاضافه");
        } else {
          toast.error("حدث خطأ ما");
        }
      });
  };

  const addsocial = () => {
    const data_send = {
      ...socialdata,
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/add_social_acc.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("تمت الاضافه");
          setShowAdd(false);
          getsocials();
        } else if (res.data.status == "error") {
          toast.error("لم تتم الاضافه");
        } else {
          toast.error("حدث خطأ ما");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getsocials = () => {
    axios
      .get("https://ahmed-cash.com/ahmed_cash/admin/select_social_acc.php")
      .then((res) => {
        setSocialaccs(res.data.message);
      });
  };

  useEffect(() => {
    getsocials();
  }, []);

  return (
    <div className="accepted_page">
      <button className="btn-o btn-primary" onClick={() => setShowAdd(true)}>
        إضافة موقع تواصل
      </button>
      {showAdd ? (
        <form
          className="ac_form"
          onSubmit={(e) => {
            e.preventDefault();
            addsocial();
          }}
        >
          <span onClick={() => setShowAdd(false)}> إغلاق </span>
          <div>
            <label for="para1">اسم الموقع</label>
            <input
              onChange={(e) => {
                setsocialdata({ ...socialdata, name: e.target.value });
              }}
              type="text"
              id="para1"
            />
          </div>
          <div>
            <label for="para1">رابط الموقع</label>
            <input
              onChange={(e) => {
                setsocialdata({ ...socialdata, link: e.target.value });
              }}
              dir="ltr"
              type="text"
              width={"100%"}
              id="para1"
              placeholder="https://api.whatsapp.com/send/?phone=+201060461116"
            />
          </div>
          <div className="walogo">
            <label for="para2"> شعار الموقع </label>
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
          <button className="btn btn-primary">إضافة</button>
        </form>
      ) : null}

      <Modal
        title="هل أنت متأكد من الحذف ؟"
        style={{
          top: 20,
        }}
        open={showDeleteModel}
        onOk={() => handleDelete()}
        onCancel={() => setShowDeleteModel(false)}
      ></Modal>

      <Table dataSource={socialaccs} columns={renderdata} />
    </div>
  );
};

export default SocialMedia;

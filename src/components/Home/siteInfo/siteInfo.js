import React, { useEffect, useState } from "react";
import "./accepted.css";
import { Modal, Select, Space, Table } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const SiteData = () => {


  const [socialdata, setsocialdata] = useState({
    content: ""
  });
  const [logoimg, setlogogimg] = useState(null);
  const renderdata = [
    {
      title: "معلومات عن الموقع",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "أوامر",
      key: "actions",
      render: (_, record) => (
        <Space>
          <div className="actions">
            <AiFillEdit
              onClick={() => {
                setSocialId(record.message);
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
  const handleDelete = (e) => {
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/update_home_info.php",
        JSON.stringify(socialdata)
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
        "https://ahmed-cash.com/ahmed_cash/user/select_home_info.php",
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
      .get("https://ahmed-cash.com/ahmed_cash/user/select_home_info.php")
      .then((res) => {
        setSocialaccs([{ message: res.data.message }]);
      });
  };

  useEffect(() => {
    getsocials();
  }, []);

  return (
    <div className="accepted_page">

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
              type="text"
              id="para1"
              placeholder="Example: wa.me/+201287289371"
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
        title="تعديل معلومات الموقع"
        style={{
          top: 20,
          width: "fit-content"
        }}
        open={showDeleteModel}
        onOk={() => handleDelete()}
        onCancel={() => setShowDeleteModel(false)}
      >
        <form action="#">
          <textarea name="content" id="content" onChange={(e) => {
            setsocialdata({ content: e.currentTarget.value && e.currentTarget.value.length ? e.currentTarget.value : socialId })
          }} defaultValue={socialId} cols="30" rows="10" style={{ width: "100%", outline: "none", borderRadius: "5px", padding: "10px" }}></textarea>
        </form>


      </Modal>

      <Table dataSource={socialaccs} columns={renderdata} />
    </div>
  );
};

export default SiteData;

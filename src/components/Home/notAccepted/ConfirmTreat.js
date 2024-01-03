import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./confirmtreat.css";
import { toast } from "react-toastify";
import PopUp from "../popUp";
import axios from "axios";
import { MdContentCopy } from "react-icons/md";
const ConfirmTreat = () => {
  const datalocal=localStorage.getItem("loggedin");

  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const cancel = () => setShow(false);
  const [client_phone,setClientPhone]=useState("");
  const [confimg,setconfimg]=useState(null);
  const confirm = () => {
    // toast.success("تم تنفيذ العملية بنجاح");
    const fromdata=new FormData();
    fromdata.append("image",confimg);
  
    axios.post("https://ahmed-cash.com/ahmed_cash/admin/item_img_uploader.php",fromdata)
    .then((res)=>{
      if(res.data.status=="success"){
        const data_send={
          wallet_from_id:item.wallet_from_id,
          wallet_to_id:item.wallet_to_id,
          amount_sent:item.amount_sent,
          received_quantity:item.received_quantity,
          rate:item.rate,
          destination_address:item.account,
          source_address:client_phone,
          user_from_id:JSON.parse(datalocal)?.user_id||0,
          confirme_photo_url:res.data.message,
        }
        axios.post("https://ahmed-cash.com/ahmed_cash/user/make_order.php",JSON.stringify(data_send))
        .then((res)=>{
        
          if(res.data.status=="success"){
            toast.success(res.data.message);
            navigate("/treatmentlist")
          }
          else if(res.data.status=="error"){
            toast.error(res.data.message);
          }
          else{
            toast.error("حدث خطأ ما")
          }
        })
      }
      else if(res.data.status=="error"){
        toast.error(res.data.message);
      }
      else {
        toast.error("حدث خطأ ما")
      }
    })

    setShow(false);
  };
  const [companynumber,setcompanynumber]=useState("");
  const getcompanyphone=()=>{
    axios.get("https://ahmed-cash.com/ahmed_cash/user/select_wallets.php")
    .then((res)=>{
      // let companynumber="";
      // for (let i=0;i<11;i++){

      // }
      let arr=res.data.message[0]?.transfare_to_details.split(" ");
      // let arrlen=res.data.message[0].transfare_to_details.split(" ").length;
      for (let i=0;i<arr.length;i++){
        if(arr[i]*1!=="NAN"){
          setcompanynumber(arr[i]);
        }
      }
      // setcompanynumber(res.data.message[0]?.transfare_to_details.splite(" "));
    })
  }
  useEffect(()=>{
    getcompanyphone()
  },[])

  function myFunction() {
    // Get the text field
    var copyText = document.getElementById("myInput");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <div className="confirm_page">
      {show ? (
        <PopUp
          title={"رسالة تأكيد"}
          text={"هل أنت متأكد من تأكيد العملية ؟"}
          closeFunction={cancel}
          conFiremFunction={confirm}
        />
      ) : null}
      <div className="confirm_form">
        <h2>بيانات العملية</h2>
        <div className="v_T">
          <h3>الارسال</h3>
          <p className="v_v">
            <table>
              <thead>
                <tr>
                  <th>القيمة </th>
                  <th>نوع</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.amount_sent}</td>
                  <td>{item.type1}</td>
                </tr>
              </tbody>
            </table>
          </p>

        </div>
        <div className="v_T">
          <h3>الاستقبال</h3>
          <p className="v_v">
            <table>
              <thead>
                <tr>
                  <th>القيمة </th>
                  <th>نوع</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.received_quantity}</td>
                  <td>{item.type2}</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>
        <div>
          <h3>الحاله</h3>
          <p style={{ display: "flex", alignItems: "center" }}>{item.status=="pending"?'موقوفه':''}</p>
        </div>
        {/* <div>
          <h3>تاريخ العمليه</h3>
          <p>06/07/2023</p>
        </div>
        <div>
          <h3>وقت العمليه</h3>
          <p>02:47 م</p>
        </div> */}
        <p>
          تأكد من جميع البيانات - ثم قم بتحويل المبلغ على رقم الحساب التالى
          وقم باالاحتفاظ ب سكرينه التحويل لاستخدامها عند الحاجه - ثم أدخل الرقم
          الذى أرسلت منه{" "}
        </p>
        <div className="copyinput">
        <input
        value={companynumber}
        id="myInput"
          type="text"
          placeholder="رقم/حساب فودافون كاش"
          // onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <MdContentCopy onClick={()=>{
          myFunction()
        }}/>
        </div>
        <input onChange={(e)=>{
          setClientPhone(e.target.value)
        }} type="text" placeholder="أدخل الرقم الذى حولت منه"/>
        <input type="file" onChange={(e)=>{
          setconfimg(e.target.files[0])
        }}/>
        <div className="btns">
          <button
            onClick={() => {
              if (client_phone) {
                setShow(true);
                confirm()
              } else {
                toast.error("برجاء إدخال رقم الهاتف");
              }
            }}
          >
            تأكيد العمليه
          </button>
          <button
            onClick={() => {
              toast.success("تم إلغاء العملية بنجاح");
              navigate("/treatments");
            }}
          >
            {" "}
            إلغاء العمليه
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTreat;

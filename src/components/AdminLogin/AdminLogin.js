import React, { useState } from "react";
import "./adminlogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router";
const AdminLogin = () => {
  const [logindata, setlogindata] = useState({
    user_email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlelogin = () => {
    const data_send = {
      ...logindata,
    };
    axios
      .post(
        "https://ahmed-cash.com/ahmed_cash/admin/admin_login.php",
        JSON.stringify(data_send)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success("تم تسجيل الدخول بنجاح");
          localStorage.setItem("loggedin", JSON.stringify(res.data.message));
          navigate("/");
        } else {
          toast.error("البيانات غير صحيحة");
        }
      })
      .catch((err) => {
        toast.error("eالبيانات غير صحيحة");
      });
  };
  return (
    <>
      {localStorage.getItem("loggedin") ? (
        <Navigate to="/" />
      ) : (
        <div className="login_page">
          <div className="login_form">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlelogin();
              }}
            >
              <h4>دخول الادمن</h4>
              <input
                onChange={(e) => {
                  setlogindata({ ...logindata, user_email: e.target.value });
                }}
                type="email"
                placeholder="أدخل البريد الإلكترونى"
                required
              />
              <input
                onChange={(e) => {
                  setlogindata({ ...logindata, password: e.target.value });
                }}
                type="passowrd"
                placeholder="أدخل كلمه السر"
                required
              />
              <button>تسجيل</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;

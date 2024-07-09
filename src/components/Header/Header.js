import React, { Fragment, useState } from "react";
import "./header.css";
import "./header.css";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import AdminPanel from "../../chat";
const Header = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  return (
    <Fragment>
      {" "}
      {!localStorage.getItem("loggedin") ? (
        <Navigate to="/adlogin" />
      ) : (
        <div className={toggle ? "header" : "header active"}>
          <AdminPanel isHeader={true}/>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logo"
          >
            <img
              style={{ width: "110px" }}
              src={require("../../assets/logo_ahmed_cash-01-removebg-preview (1).png")}
              alt=""
            />
          </div>

          <div className="links">
            <div
              onClick={() => {
                navigate("/");
              }}
              className="logo min-logo"
            >
              <img
                style={{ width: "110px" }}
                src={require("../../assets/logo_ahmed_cash-01-removebg-preview (1).png")}
                alt=""
              />
            </div>
            <NavLink to={"/"} onClick={() => setToggle(true)}>
              لوحة التحكم
            </NavLink>
            <NavLink to={"/user"} onClick={() => setToggle(true)}>
              المستخدمين
            </NavLink>
            <NavLink to={"/Participent"} onClick={() => setToggle(true)}>
              الشركاء
            </NavLink>
            <NavLink to={"/ReqGet"} onClick={() => setToggle(true)}>
              طلبات السحب
            </NavLink>
            <NavLink to={"/chat"} onClick={() => setToggle(true)}>
              المحادثات
            </NavLink>
            {
              // <NavLink to={"/employees"} onClick={() => setToggle(true)}>
              //   الموظفين
              // </NavLink>
            }
            <NavLink to={"/accepted"} onClick={() => setToggle(true)}>
              التحويلات المنتهية
            </NavLink>
            <NavLink to={"/notaccepted"} onClick={() => setToggle(true)}>
              التحويلات المعلقه
            </NavLink>
            <NavLink to={"/eg-wallet"} onClick={() => setToggle(true)}>
              المحافظ المصرية
            </NavLink>{" "}
            <NavLink to={"/foreign-wallet"} onClick={() => setToggle(true)}>
              المحافظ الأجنبية
            </NavLink>
            <NavLink to={"/socialmedia"} onClick={() => setToggle(true)}>
              مواقع التواصل
            </NavLink>
            <NavLink to={"/site_data"} onClick={() => setToggle(true)}>
              معلومات عن الموقع
            </NavLink>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
              role="button"
              onClick={() => {
                localStorage.removeItem("loggedin");
                navigate("/adlogin");
              }}
            >
              <span>تسجيل الخروج</span>
            </div>
          </div>

          <div className="menu-toggle" onClick={() => setToggle(!toggle)}>
            <Icon icon="uis:bars" />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Header;

import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import User from "./components/users/User";
import Header from "./components/Header/Header";
import Accepted from "./components/Home/accepted/Accepted";
import NotAccepted from "./components/Home/notAccepted/NotAccepted";
import Employees from "./components/Home/emloyess";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Egy_Wallets from "./components/Home/Egy_Wallets/Egy_Wallets";
import Foreign_Wallet from "./components/Home/Foreign_Wallet/Foreign_Wallet";
import axios from "axios";
import { useEffect, useState } from "react";
import TreatmentsList from "./components/Home/treatmentList/TreatmentList";
import SocialMedia from "./components/Home/SocialMedia/SocialMedia";
import SiteData from "./components/Home/siteInfo/siteInfo";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/adlogin" element={<AdminLogin />} />
        <Route path="/accepted" element={<Accepted />} />
        <Route path="/notaccepted" element={<NotAccepted />} />
        <Route path="/eg-wallet" element={<Egy_Wallets />} />
        <Route path="/foreign-wallet" element={<Foreign_Wallet />} />
        <Route path="/treatments" element={<TreatmentsList />} />
        <Route path="/socialmedia" element={<SocialMedia />} />
        <Route path="/site_data" element={<SiteData />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

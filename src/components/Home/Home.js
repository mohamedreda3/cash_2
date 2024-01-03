import React, { useState } from "react";
import "./home.css";
import Accepted from "./accepted/Accepted";
import NotAccepted from "./notAccepted/NotAccepted";
const Home = () => {
  const [accactive, setaccactive] = useState("accepted");
  return (
    <div className="home_page">
      <div className="accepted_not_tag">
        <button
          className={accactive == "accepted" ? "active" : ""}
          onClick={() => {
            setaccactive("accepted");
          }}
        >
          accepted
        </button>
        <button
          className={accactive == "notaccepted" ? "active" : ""}
          onClick={() => {
            setaccactive("notaccepted");
          }}
        >
          denied
        </button>
      </div>
      {accactive == "accepted" ? <Accepted /> : <NotAccepted />}
    </div>
  );
};

export default Home;

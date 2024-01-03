import React, { useState } from "react";
// import "../treatments/treatment.css";
import './treatmentlist.css'
import { AiOutlineQuestion } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router";
import { RiFileList2Fill } from 'react-icons/ri'
import { AiOutlineCheck } from 'react-icons/ai';
import { HiOutlineBan } from 'react-icons/hi'
import { BsArrowLeft } from 'react-icons/bs'
const TreatmentsList = () => {
  const navigate = useNavigate();
  const [tratments, settratments] = useState([
    {
      money1: "556",
      kind1: "فودافون كاش",
      kind2: "اسكريل",
      money2: "546",
      numofop: "332g",
      status: "pend",

    },
    {
      money1: "5566",
      kind1: "فودافون كاش",
      kind2: "اسكريل",
      money2: "5500",
      numofop: "332g",
      status: "done",
    },
    {
      money1: "5566",
      kind1: "فودافون كاش",
      kind2: "اسكريل",
      money2: "5500",
      numofop: "332g",
      status: "stoped",
    },
    {
      money1: "556",
      kind1: "فودافون كاش",
      kind2: "اسكريل",
      money2: "546",
      numofop: "332g",
      status: "pend",

    },
    {
      money1: "5566",
      kind1: "فودافون كاش",
      kind2: "اسكريل",
      money2: "5500",
      numofop: "332g",
      status: "done",
    },
    {
      money1: "5566",
      kind1: "فودافون كاش",
      kind2: "اسكريل",
      money2: "5500",
      numofop: "332g",
      status: "stoped",
    },
  ]);
  const [treatmentlist, settreatmentlist] = useState(
    [
      {
        deal_id: 20,
        from_wallet_name: "اسكريل",
        to_wallet_name: "فودافون كاش",
        from_money: 500,
        to_money: 20000,
        status: "غير مؤكدة",
        account_num_wallet: "",
        deal_date: "15/07/2013",
        deal_time: "04:15",
        account_transfer_to: ""

      },
      {
        deal_id: 21,
        from_wallet_name: "اسكريل",
        to_wallet_name: "فودافون كاش",
        from_money: 500,
        to_money: 20000,
        status: "مؤكدة",
        account_num_wallet: "",
        deal_date: "15/07/2013",
        deal_time: "04:15",
        account_transfer_to: ""

      },
      {
        deal_id: 21,
        from_wallet_name: "اسكريل",
        to_wallet_name: "فودافون كاش",
        from_money: 500,
        to_money: 20000,
        status: "انتهت",
        account_num_wallet: "",
        deal_date: "15/07/2013",
        deal_time: "04:15",
        account_transfer_to: ""

      }
    ]
  )
  return (
    <div className="treatments_page">
      {/* <div className="treatments treatmenstlist">
        <h2>سجل التحويلات</h2>

        {tratments.map((item, index) => {
          return (
            <div className="treatment">
              <div className="treatment_details">
                <p className="v_v">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th> تحويل</th>
                        <th> استقبال</th>
                        <th>الحاله</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>المبلغ</td>
                        <td>{item.money1}</td>
                        <td>{item.money2}</td>
                      </tr>
                      <tr>
                        <td>النوع</td>
                        <td>{item.kind1}</td>
                        <td>{item.kind2}</td>
                        <td>
                          {
                            item.status=="pend"?
                            (
                              <h4 style={{
                                backgroundColor:'#ffca2c',
                                width:'fit-content',
                                margin:'auto',
                                padding:'2px',
                                color:'white',
                                borderRadius:'3px'
                              }}>pending</h4>
                            )
                            :
                            item.status=="done"?
                            (
                              <h4 style={{
                                backgroundColor:'#157347',
                                width:'fit-content',
                                margin:'auto',
                                padding:'2px',
                                color:'white',
                                borderRadius:'3px'
                              }}>success</h4>
                            ):
                            (
                              <h4 style={{
                                backgroundColor:'#bb2d3b',
                                width:'fit-content',
                                margin:'auto',
                                padding:'2px',
                                color:'white',
                                borderRadius:'3px'
                              }}>rejected</h4>
                            )
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          );
        })}
      </div> */}
      <div className="treatments treatmenstlist">
        <div className="treatmentsdiv">
          {
            treatmentlist.map((item, index) => {
              return (
                <div className="treatmentdiv">
                  <div className="treatment_icon">
                    {
                      item.status == "غير مؤكدة" ? (
                        <RiFileList2Fill style={{ color: "#f6931b" }} />
                      )
                        :
                        item.status == "مؤكدة" ?
                          (
                            <AiOutlineCheck style={{ color: '#00B112' }} />
                          )
                          : (
                            <HiOutlineBan style={{ color: '#bb2d3b' }} />
                          )
                    }
                  </div>
                  <div className="treatment_status">
                    <div>
                      <h4>{item.from_wallet_name}</h4>
                      <BsArrowLeft />
                      <h4>{item.to_wallet_name}</h4>
                    </div>
                    <div>
                      <h4>المبلغ.</h4>
                      <h4>{item.from_money}...{item.to_money}</h4>
                    </div>
                    <div>
                      <h4>رقم العملية:</h4>
                      <h4>{item.deal_id}({item.status})</h4>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default TreatmentsList;

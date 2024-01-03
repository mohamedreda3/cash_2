import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";

import {
  LineChart1,
  LineChart2,
  LineChart3,
  LineChart4,
  LineChart5,
} from "./apexLineCharts";

const LineCharts = ({
  clients,
  visitors,
  subscriptions,
  subscriptions_total_money,
  today_visites_count,
}) => {

  return (
    <>
      <Col style={{width:'100%'}} xl={8}>
        <Row style={{
          display:'flex',
          gap:'20px',
          flexWrap:'wrap',
        }}>

          <Col style={{
            width:'230px',
            padding:'10px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }} md={6} lg={3} className="col_sta">
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p style={{padding:'0px 10px'}} className="text-muted mt-4 mb-0"> عدد الزيارات اليومية </p>
                <h4 style={{padding:'0px 10px'}} className="mt-1 mb-0">
                  27{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 18%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[1, 2, 3, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد الموظفين</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 12%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[1, 2, 37, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد التحويلات اليوميه</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 12%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[1, 22, 37, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد التحويلات</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 12%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[11, 22, 37, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>


          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد تحويلات فودافون</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 22%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[110, 22, 37, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد تحويلات اسكريل</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 18%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[110, 22, 337, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد تحويلات موبينيل</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 11%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[110, 232, 337, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد تحويلات انستا باى</p>
                <h4 className="mt-1 mb-0">
                  47{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 13%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[101, 2, 7, 4]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد تحويلات وى</p>
                <h4 className="mt-1 mb-0">
                  17{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 23%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[101, 12, 71, 4,98,22]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد عمليات التأكيد</p>
                <h4 className="mt-1 mb-0">
                  27{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 13%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[101,4,98,22]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد عمليات الرفض</p>
                <h4 className="mt-1 mb-0">
                  27{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 13%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[101,74,98,22]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col style={{
            width:'230px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
          }} className="col_sta" md={6} lg={3}>
            <Card>
              <CardBody>
                <div className="avatar">
                  <span className="avatar-title bg-soft-success rounded">
                    <i className="mdi mdi-account-multiple-outline text-success font-size-24"></i>
                  </span>
                </div>

                <p className="text-muted mt-4 mb-0"> عدد العمليات المؤجله</p>
                <h4 className="mt-1 mb-0">
                  27{" "}
                  <sup className="text-danger fw-medium font-size-14">
                    <i className="mdi mdi-arrow-down"></i> 13%
                  </sup>
                </h4>
                <div>
                  <div className="py-3 my-1">
                    {/* Line Chart 4*/}
                    <LineChart5 id="mini-5" data={[11,4,98,22]} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default LineCharts;

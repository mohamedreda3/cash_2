import React from "react";
import { Row, Col, Card, CardBody, Container, CardHeader } from "reactstrap";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// Import Charts
import LineChart from "./AllCharts/chartjs/linechart";
import BarChart from "./AllCharts/chartjs/barchart";
import PieChart from "./AllCharts/chartjs/piechart";
import DountChart from "./AllCharts/chartjs/dountchart";
import RadarChart from "./AllCharts/chartjs/radarchart";
import PolarChart from "./AllCharts/chartjs/polarchart";

const ChartjsCharts = () => {
    document.title = "Chartjs | Dream Gym - React Admin & Dashboard Template";

    return (
        <>
            <div className="page-content">
                <Container fluid={true}>

                    <Breadcrumbs title="Charts" breadcrumbItem="Chartjs" />

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <LineChart />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Bar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <BarChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Pie Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <PieChart />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Donut Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <DountChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Polar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <PolarChart />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Radar Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <RadarChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </>
    )
}

export default ChartjsCharts;

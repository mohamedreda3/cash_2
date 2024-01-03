import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineCharts from "../lineCharts";
Chart.register(CategoryScale);

const LineChart = () => {
  const data = {
    labels: "الطلبات اليومية",
    datasets: [20, 20, 10, 90],
  };

  return (
    <>
      <div className="charts">
        <LineCharts />
      </div>
    </>
  );
};

export default LineChart;

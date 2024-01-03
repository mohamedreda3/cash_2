import React from "react"
import ReactApexChart from "react-apexcharts"



const barchart = () => {

  const data = {
    series: [
      {
        data: [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
  
      colors: ["#33a186"],
      grid: {
        borderColor: "#f1f1f1",
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
      },
    },
  }

  return(
    <>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height="350"
          className="apex-charts"
        />
      </>
  )
}

export default barchart;

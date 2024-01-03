import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart1 = ({ data }) => {
  const Data = {
    series: [
      {
        data: data ? data : [2, 36, 22, 30, 12, 38],
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 61,
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#3980c0"],
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={Data.options}
        series={Data.series}
        type="line"
        height={61}
        className="apex-charts"
      />
    </>
  );
};

const LineChart2 = ({ data }) => {
  const Data = {
    series: [
      {
        data: data,
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 61,
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#33a186"],
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={Data.options}
        series={Data.series}
        type="line"
        height={61}
        className="apex-charts"
      />
    </>
  );
};

const LineChart3 = ({ data }) => {
  const Data = {
    series: [
      {
        data: data,
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 61,
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#3980c0"],
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={Data.options}
        series={Data.series}
        type="line"
        height={61}
        className="apex-charts"
      />
    </>
  );
};

const LineChart4 = ({ data }) => {
  const Data = {
    series: [
      {
        data: data,
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 61,
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#33a186"],
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={Data.options}
        series={Data.series}
        type="line"
        height={61}
        className="apex-charts"
      />
    </>
  );
};

const LineChart5 = ({ data }) => {
  const Data = {
    series: [
      {
        data: data,
      },
    ],

    options: {
      chart: {
        type: "line",
        height: 61,
        sparkline: {
          enabled: true,
        },
      },
      colors: ["#3980c0"],
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
        marker: {
          show: false,
        },
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={Data.options}
        series={Data.series}
        type="line"
        height={61}
        className="apex-charts"
      />
    </>
  );
};

export { LineChart1, LineChart2, LineChart3, LineChart4, LineChart5 };

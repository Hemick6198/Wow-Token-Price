import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as echarts from "echarts";
import moment from "moment";

function App() {
  const monthlyChartRef = useRef(null);
  const weeklyChartRef = useRef(null);
  const dailyChartRef = useRef(null);

  useEffect(() => {
    fetchDailyPrices();
    fetchWeeklyPrices();
    fetchMonthlyPrices();
  }, []);

  async function fetchMonthlyPrices() {
    try {
      const response = await axios.get(
        "https://data.wowtoken.app/token/history/us/760h.json"
      );

      const data = response.data;

      const formattedData = data.map((item) => ({
        time: moment(item.time).format("YYYY-MM-DD HH:mm"),
        value: item.value,
      }));

      const times = formattedData.map((item) => item.time);
      const values = formattedData.map((item) => item.value);

      const chart = echarts.init(monthlyChartRef.current);
      chart.setOption({
        title: {
          text: "Monthly WoW Token Prices",
        },
        xAxis: {
          type: "category",
          data: times,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis", // Show tooltip on hovering over data points
          formatter: function (params) {
            const price = params[0].value; // Get the price value
            return `Price: ${price}`; // Format tooltip content
          },
        },
        series: [
          {
            name: "Prices",
            type: "line",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching Monthly prices:", error);
    }
  }

  async function fetchWeeklyPrices() {
    try {
      const response = await axios.get(
        "https://data.wowtoken.app/token/history/us/168h.json"
      );

      const data = response.data;

      const formattedData = data.map((item) => ({
        time: moment(item.time).format("YYYY-MM-DD HH:mm"),
        value: item.value,
      }));

      const times = formattedData.map((item) => item.time);
      const values = formattedData.map((item) => item.value);

      const chart = echarts.init(weeklyChartRef.current);
      chart.setOption({
        title: {
          text: "Weekly WoW Token Prices",
        },
        xAxis: {
          type: "category",
          data: times,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            const price = params[0].value;
            return `Price: ${price}`;
          },
        },
        series: [
          {
            name: "Prices",
            type: "line",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching Weekly prices:", error);
    }
  }

  async function fetchDailyPrices() {
    try {
      const response = await axios.get(
        "https://data.wowtoken.app/token/history/us/24h.json"
      );

      const data = response.data;

      const formattedData = data.map((item) => ({
        time: moment(item.time).format("YYYY-MM-DD HH:mm"),
        value: item.value,
      }));

      const times = formattedData.map((item) => item.time);
      const values = formattedData.map((item) => item.value);

      const chart = echarts.init(dailyChartRef.current);
      chart.setOption({
        title: {
          text: "Daily WoW Token Prices",
        },
        xAxis: {
          type: "category",
          data: times,
        },
        yAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            const price = params[0].value;
            return `Price: ${price}`;
          },
        },
        series: [
          {
            name: "Prices",
            type: "line",
            data: values,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching Weekly prices:", error);
    }
  }

  return (
    <>
      <h1>WoW Token Prices</h1>
      <div
        ref={monthlyChartRef}
        style={{ width: "600px", height: "400px", marginBottom: "20px" }}
      ></div>
      <div
        ref={weeklyChartRef}
        style={{ width: "600px", height: "400px" }}
      ></div>
      <div
        ref={dailyChartRef}
        style={{ width: "600px", height: "400px" }}
      ></div>
    </>
  );
}

export default App;

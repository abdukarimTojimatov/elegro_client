import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const rawData = {
  2024: {
    1: {
      1: { uv: 4000, pv: 2400 },
      2: { uv: 3800, pv: 2200 },
      3: { uv: 3500, pv: 2000 },
    },
    2: {
      1: { uv: 200, pv: 2450 },
      2: { uv: 3900, pv: 2300 },
      3: { uv: 3700, pv: 2150 },
    },
    3: {
      1: { uv: 4100, pv: 2450 },
      2: { uv: 3900, pv: 2300 },
      3: { uv: 3700, pv: 2150 },
    },
    4: {
      1: { uv: 4100, pv: 2450 },
      2: { uv: 3900, pv: 2300 },
      3: { uv: 3700, pv: 2150 },
    },
    5: {
      1: { uv: 4100, pv: 2450 },
      2: { uv: 3900, pv: 2300 },
      3: { uv: 3700, pv: 2150 },
    },
  },
  2023: {
    1: {
      1: { uv: 3000, pv: 2000 },
      2: { uv: 2800, pv: 1800 },
      3: { uv: 2600, pv: 1600 },
    },
    2: {
      1: { uv: 3200, pv: 2100 },
      2: { uv: 2900, pv: 1900 },
      3: { uv: 2700, pv: 1700 },
    },
  },
};

export default function ExpenceChart() {
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let newData = [];

    if (year && month && day) {
      // Day View (Single Data Point)
      const values = rawData[year]?.[month]?.[day];
      if (values) {
        newData = [{ name: `Day ${day}`, uv: values.uv, pv: values.pv }];
      }
    } else if (year && month) {
      // Month View (Days in a Month)
      newData = Object.entries(rawData[year]?.[month] || {}).map(
        ([day, values]) => ({
          name: `Day ${day}`,
          uv: values.uv,
          pv: values.pv,
        })
      );
    } else if (year) {
      // Year View (Months in a Year)
      newData = Object.entries(rawData[year] || {}).map(([month, days]) => {
        let avgUv =
          Object.values(days).reduce((sum, d) => sum + d.uv, 0) /
          Object.keys(days).length;
        let avgPv =
          Object.values(days).reduce((sum, d) => sum + d.pv, 0) /
          Object.keys(days).length;
        return { name: `Month ${month}`, uv: avgUv, pv: avgPv };
      });
    }

    setChartData(newData);
  }, [year, month, day]);

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Filters */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "50px",
          alignItems: "start",
          justifyContent: "space-around",
          background: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <select
          className="text-black"
          onChange={(e) => {
            setYear(Number(e.target.value));
          }}
          value={year}
        >
          {Object.keys(rawData).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} className="bg-white border rounded pt-7">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

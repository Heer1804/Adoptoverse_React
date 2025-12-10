import React from "react";
import "../admin.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 100 },
  { month: "Mar", sales: 200 },
  { month: "Apr", sales: 200 },
  { month: "May", sales: 200 },
  { month: "Jun", sales: 300 },
  { month: "Jul", sales: 350 },
  { month: "Aug", sales: 300 },
  { month: "Sep", sales: 250 },
  { month: "Oct", sales: 350 },
  { month: "Nov", sales: 400 },
  { month: "Dec", sales: 450 },
];

export default function MonthlySalesChart() {
  return (
    <div className="monthly-sales-card shadow-sm p-4">
      <h4 className="text-center mb-4 fw-semibold chart-title">
        <i className="bi bi-graph-up-arrow me-2"></i>Monthly Sales Overview
      </h4>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#273a4fff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#023163ff" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" stroke="#555" />
          <YAxis stroke="#555" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
          />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="url(#colorSales)"
            strokeWidth={3}
            dot={{ fill: "#0c0761ff", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

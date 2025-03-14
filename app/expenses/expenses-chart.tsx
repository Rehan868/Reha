"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Supplies", value: 35 },
  { name: "Equipment", value: 20 },
  { name: "Services", value: 25 },
  { name: "Maintenance", value: 15 },
  { name: "Others", value: 5 },
]

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#6b7280"]

export function ExpensesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}


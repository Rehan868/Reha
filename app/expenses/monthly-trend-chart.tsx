"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { name: "Sep", amount: 7500 },
  { name: "Oct", amount: 8200 },
  { name: "Nov", amount: 7900 },
  { name: "Dec", amount: 8500 },
  { name: "Jan", amount: 8234 },
]

export function MonthlyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


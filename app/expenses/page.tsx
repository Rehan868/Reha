"use client"

import { useState } from "react"
import { Search, Download, Plus, Eye, Pencil, Trash2, X } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExpensesChart } from "./expenses-chart"
import { MonthlyTrendChart } from "./monthly-trend-chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

const expenses = [
  {
    date: "2024-01-15",
    description: "Maintenance Supplies",
    category: "Supplies",
    department: "Maintenance",
    payment: "Credit Card",
    amount: 1234.56,
    status: "Approved",
  },
  {
    date: "2024-01-14",
    description: "Kitchen Equipment",
    category: "Equipment",
    department: "Kitchen",
    payment: "Bank Transfer",
    amount: 2845.0,
    status: "Pending",
  },
  {
    date: "2024-01-13",
    description: "Cleaning Services",
    category: "Services",
    department: "Housekeeping",
    payment: "Credit Card",
    amount: 1500.0,
    status: "Approved",
  },
  {
    date: "2024-01-12",
    description: "Office Supplies",
    category: "Supplies",
    department: "Administration",
    payment: "Cash",
    amount: 456.78,
    status: "Approved",
  },
  {
    date: "2024-01-11",
    description: "Staff Training",
    category: "Training",
    department: "HR",
    payment: "Bank Transfer",
    amount: 2000.0,
    status: "Rejected",
  },
  {
    date: "2024-01-10",
    description: "Food Supplies",
    category: "Supplies",
    department: "Restaurant",
    payment: "Credit Card",
    amount: 3456.89,
    status: "Approved",
  },
  {
    date: "2024-01-09",
    description: "Furniture Repair",
    category: "Maintenance",
    department: "Rooms",
    payment: "Cash",
    amount: 890.0,
    status: "Pending",
  },
  {
    date: "2024-01-08",
    description: "Marketing Campaign",
    category: "Marketing",
    department: "Sales",
    payment: "Bank Transfer",
    amount: 5000.0,
    status: "Approved",
  },
  {
    date: "2024-01-07",
    description: "Utility Bills",
    category: "Utilities",
    department: "Facilities",
    payment: "Bank Transfer",
    amount: 4567.89,
    status: "Approved",
  },
  {
    date: "2024-01-06",
    description: "Pool Maintenance",
    category: "Maintenance",
    department: "Facilities",
    payment: "Credit Card",
    amount: 789.45,
    status: "Pending",
  },
]

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage="expenses" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Expenses Management</h1>
            <div className="flex items-center gap-4">
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>

              <Button asChild className="flex items-center gap-2">
                <Link href="/expenses/new">
                  <Plus className="h-4 w-4" />
                  Add Expense
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Expenses" value="$24,567" change="+12.5%" positive={true} />
            <StatCard title="This Month" value="$8,234" change="+5.2%" positive={true} />
            <StatCard title="Last Month" value="$7,890" change="-2.4%" positive={false} />
            <StatCard title="Average Monthly" value="$7,980" change="+3.1%" positive={true} />
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="housekeeping">Housekeeping</SelectItem>
                <SelectItem value="kitchen">Kitchen</SelectItem>
                <SelectItem value="admin">Administration</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-grow max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Department</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expenses.map((expense, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{expense.payment}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">${expense.amount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={expense.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link href={`/expenses/${index}`} className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link href={`/expenses/${index}/edit`} className="text-gray-400 hover:text-gray-600">
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <button
                                className="text-gray-400 hover:text-red-600"
                                onClick={() => setExpenseToDelete(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirm Deletion</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete the expense "
                                  {expenseToDelete !== null ? expenses[expenseToDelete].description : ""}"? This action
                                  cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setExpenseToDelete(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    // Here you would call your delete API
                                    console.log(`Deleting expense ${expenseToDelete}`)
                                    // For now, just close the dialog
                                    setExpenseToDelete(null)
                                  }}
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">Showing 1 to 10 of 50 entries</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="blue" className="px-3 min-w-[40px]">
                  1
                </Button>
                <Button variant="outline" className="px-3 min-w-[40px]">
                  2
                </Button>
                <Button variant="outline" className="px-3 min-w-[40px]">
                  3
                </Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Expense Categories</h2>
              <ExpensesChart />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trend</h2>
              <MonthlyTrendChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, positive }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-800 mb-2">{value}</div>
      <div className={`text-sm ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
    </div>
  )
}

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-100"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-100"
      case "rejected":
        return "bg-red-50 text-red-700 border-red-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-100"
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  )
}


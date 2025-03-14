import Link from "next/link"

const expenses = [
  {
    id: 1,
    category: "Maintenance",
    date: "Jan 15, 2024",
    amount: 450,
  },
  {
    id: 2,
    category: "Supplies",
    date: "Jan 14, 2024",
    amount: 280,
  },
  {
    id: 3,
    category: "Utilities",
    date: "Jan 13, 2024",
    amount: 850,
  },
  {
    id: 4,
    category: "Staff Salary",
    date: "Jan 12, 2024",
    amount: 2400,
  },
]

export default function RecentExpenses() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Recent Expenses</h2>
        <Link href="/expenses" className="text-blue-600 text-sm hover:underline">
          View All
        </Link>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium text-gray-800">{expense.category}</div>
                <div className="text-xs text-gray-500">{expense.date}</div>
              </div>
              <div className="font-semibold text-gray-800">$ {expense.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


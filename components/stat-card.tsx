import {
  CalendarCheckIcon,
  CalendarXIcon,
  BedIcon,
  DollarSignIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react"

const icons = {
  "calendar-check": CalendarCheckIcon,
  "calendar-x": CalendarXIcon,
  bed: BedIcon,
  "dollar-sign": DollarSignIcon,
}

export default function StatCard({ icon, title, value, change, positive, color }) {
  const Icon = icons[icon]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-md bg-${color}-50 text-${color}-600`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`flex items-center text-sm ${positive ? "text-green-600" : "text-red-600"}`}>
          {positive ? <TrendingUpIcon className="h-4 w-4 mr-1" /> : <TrendingDownIcon className="h-4 w-4 mr-1" />}
          <span>{change}</span>
        </div>
      </div>
      <div className="text-gray-500 text-sm mb-1">{title}</div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
    </div>
  )
}


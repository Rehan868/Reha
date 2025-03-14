"use client"

import { PlusIcon, CheckCircleIcon, XCircleIcon, FlaskConicalIcon as FlaskIcon } from "lucide-react"

const icons = {
  plus: PlusIcon,
  "check-circle": CheckCircleIcon,
  "x-circle": XCircleIcon,
  flask: FlaskIcon,
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  red: "bg-red-50 text-red-600 border-red-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
}

export default function ActionButton({ icon, title, color, onClick }) {
  const Icon = icons[icon]
  const colorClass = colorClasses[color]

  return (
    <button
      className={`flex items-center gap-3 p-6 rounded-lg border ${colorClass} w-full hover:opacity-90 transition-opacity`}
      onClick={onClick}
    >
      <Icon className="h-6 w-6" />
      <span className="font-medium">{title}</span>
    </button>
  )
}


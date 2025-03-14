import Image from "next/image"

const activities = [
  {
    id: 1,
    user: {
      name: "Alice Cooper",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "checked in guest to Room 201",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Bob Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: 'updated room status to "Clean"',
    time: "3 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Carol Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "processed payment for Room 305",
    time: "4 hours ago",
  },
  {
    id: 4,
    user: {
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "created new booking",
    time: "5 hours ago",
  },
]

export default function UserActivity() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">User Activity</h2>
        <a href="#" className="text-blue-600 text-sm hover:underline">
          View All
        </a>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={activity.user.avatar || "/placeholder.svg"}
                  alt={activity.user.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm">
                  <span className="font-medium text-gray-800">{activity.user.name}</span>{" "}
                  <span className="text-gray-600">{activity.action}</span>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


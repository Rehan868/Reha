import Image from "next/image"
import Link from "next/link"

const bookings = [
  {
    id: 1,
    guest: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    room: "Room 201",
    checkIn: "Jan 15, 2024",
    checkOut: "Jan 18, 2024",
    status: "Checked In",
  },
  {
    id: 2,
    guest: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    room: "Room 305",
    checkIn: "Jan 16, 2024",
    checkOut: "Jan 20, 2024",
    status: "Reserved",
  },
  {
    id: 3,
    guest: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    room: "Room 402",
    checkIn: "Jan 15, 2024",
    checkOut: "Jan 17, 2024",
    status: "Checked Out",
  },
  {
    id: 4,
    guest: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    room: "Room 103",
    checkIn: "Jan 16, 2024",
    checkOut: "Jan 19, 2024",
    status: "Reserved",
  },
]

export default function RecentBookings() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Recent Bookings</h2>
        <Link href="/bookings" className="text-blue-600 text-sm hover:underline">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
              <th className="px-4 py-3 font-medium">Guest Name</th>
              <th className="px-4 py-3 font-medium">Room</th>
              <th className="px-4 py-3 font-medium">Check-in</th>
              <th className="px-4 py-3 font-medium">Check-out</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <Image
                        src={booking.guest.avatar || "/placeholder.svg"}
                        alt={booking.guest.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{booking.guest.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.room}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.checkIn}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.checkOut}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Checked In":
        return "bg-green-50 text-green-600 border-green-100"
      case "Checked Out":
        return "bg-gray-50 text-gray-600 border-gray-100"
      case "Reserved":
        return "bg-blue-50 text-blue-600 border-blue-100"
      default:
        return "bg-gray-50 text-gray-600 border-gray-100"
    }
  }

  return <span className={`text-xs px-2 py-1 rounded-full border ${getStatusStyles()}`}>{status}</span>
}


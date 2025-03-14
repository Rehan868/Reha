"use client"

import Link from "next/link"
import {
  HomeIcon,
  CalendarIcon,
  ClipboardListIcon,
  BedIcon,
  DollarSignIcon,
  BarChartIcon,
  UsersIcon,
  BirdIcon as BroomIcon,
  SettingsIcon,
  Building2,
} from "lucide-react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const isActive = (href) => {
    return pathname === href
  }

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
          <Building2 className="h-6 w-6" />
          <span>Hotel PMS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <SidebarItem href="/" icon={<HomeIcon className="h-5 w-5" />} text="Dashboard" active={isActive("/")} />
        <SidebarItem
          href="/bookings"
          icon={<CalendarIcon className="h-5 w-5" />}
          text="Bookings"
          active={isActive("/bookings")}
        />
        <SidebarItem
          href="/calendar"
          icon={<ClipboardListIcon className="h-5 w-5" />}
          text="Availability Calendar"
          active={isActive("/calendar")}
        />
        <SidebarItem href="/rooms" icon={<BedIcon className="h-5 w-5" />} text="Rooms" active={isActive("/rooms")} />
        <SidebarItem
          href="/expenses"
          icon={<DollarSignIcon className="h-5 w-5" />}
          text="Expenses"
          active={isActive("/expenses")}
        />
        <SidebarItem
          href="/reports"
          icon={<BarChartIcon className="h-5 w-5" />}
          text="Reports"
          active={isActive("/reports")}
        />
        <SidebarItem
          href="/users"
          icon={<UsersIcon className="h-5 w-5" />}
          text="Users Management"
          active={isActive("/users")}
        />
        <SidebarItem
          href="/cleaning"
          icon={<BroomIcon className="h-5 w-5" />}
          text="Cleaning Status"
          active={isActive("/cleaning")}
        />
        <SidebarItem
          href="/settings"
          icon={<SettingsIcon className="h-5 w-5" />}
          text="Settings"
          active={isActive("/settings")}
        />
      </nav>
    </div>
  )
}

function SidebarItem({ href, icon, text, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  )
}


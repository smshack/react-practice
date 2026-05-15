import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react"

import DashboardPage from "@/pages/DashboardPage"
import UsersPage from "@/pages/UsersPage"
import SettingsPage from "@/pages/SettingsPage"

export const menuItems = [
  {
    path: "/",
    title: "Dashboard",
    icon: LayoutDashboard,
    element: <DashboardPage />,
  },

  {
    path: "/users",
    title: "Users",
    icon: Users,
    element: <UsersPage />,
  },

  {
    path: "/settings",
    title: "Settings",
    icon: Settings,
    element: <SettingsPage />,
  },
]
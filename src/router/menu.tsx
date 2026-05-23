import { LayoutDashboard, Users, Settings } from "lucide-react"
import DashboardPage from "@/pages/DashboardPage"
import UsersPage from "@/pages/UsersPage"
import SettingsPage from "@/pages/SettingsPage"

export const menuItems = [
  {
    path: "/dashboard", // 💡 고유 경로로 분리하여 루트(/) 분기문과의 충돌을 방지합니다.
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
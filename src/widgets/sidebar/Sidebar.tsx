import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react"

import {
  Link,
} from "react-router-dom"

export default function Sidebar() {

  return (
    <aside className="w-64 border-r bg-background p-4">

      <h1 className="text-2xl font-bold mb-10">
        SMART ADMIN
      </h1>

      <nav className="space-y-2">

        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/users"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <Users size={18} />
          Users
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted"
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>

    </aside>
  )
}
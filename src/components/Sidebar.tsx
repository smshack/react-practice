import {
  Link,
  useLocation,
} from "react-router-dom"

import { menuItems } from "@/router/menu"

export default function Sidebar() {

  const location = useLocation()

  return (
    <aside className="w-64 border-r bg-background p-4">

      <h1 className="text-2xl font-bold mb-10">
        SMART ADMIN
      </h1>

      <nav className="space-y-2">

        {menuItems.map((menu) => {

          const Icon = menu.icon

          const isActive =
            location.pathname === menu.path

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`
                flex items-center gap-2 rounded-lg px-3 py-2 transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }
              `}
            >
              <Icon size={18} />
              {menu.title}
            </Link>
          )
        })}

      </nav>

    </aside>
  )
}
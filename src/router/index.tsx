import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { menuItems } from "@/router/menu"

export default function Router() {

  return (
    <BrowserRouter>

      <Routes>

        {menuItems.map((menu) => (
          <Route
            key={menu.path}
            path={menu.path}
            element={menu.element}
          />
        ))}

      </Routes>

    </BrowserRouter>
  )
}
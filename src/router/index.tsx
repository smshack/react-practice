import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import DashboardPage from "@/pages/dashboard/DashboardPage"

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}
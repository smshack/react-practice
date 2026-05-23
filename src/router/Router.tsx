import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { menuItems } from "@/router/menu"
import LoginPage from "@/pages/LoginPage"
import ProtectedRoute from "@/components/ProtectedRoute"
import { getToken } from "@/lib/auth"

export default function Router() {
  // Redux 상태 및 스토리지에서 인증 상태와 토큰을 확인합니다.
  const isLogin = useSelector((state: any) => state.auth.isLogin)
  const token = getToken()
  const isAuthenticated = isLogin || token

  return (
    <BrowserRouter>
      <Routes>
        {/* 💡 1. 루트 경로(/) 접근 시 상태에 따른 조건부 리다이렉트 */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 💡 2. 로그인 페이지 오픈 라우트 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 💡 3. 인증 가드 그룹: 로그인된 유저만 menuItems 배열 내부 메뉴들에 접근 허용 */}
        <Route element={<ProtectedRoute />}>
          {menuItems.map((menu) => (
            <Route
              key={menu.path}
              path={menu.path}
              element={menu.element}
            />
          ))}
        </Route>

        {/* 💡 4. 잘못된 경로(404 대용) 예외 처리: 무조건 루트(/) 진입점으로 던집니다. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
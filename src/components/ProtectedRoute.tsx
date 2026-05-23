import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "@/lib/auth";

/**
 * [인증 가드 컴포넌트]
 * 전역 상태(Redux) 혹은 스토리지에 Access Token이 있는지 판별하여
 * 자식 라우트(Outlet)를 보여주거나 로그인 페이지로 강제 리다이렉트 시킵니다.
 */
export default function ProtectedRoute() {
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const token = getToken();

  // 💡 Redux 상태가 풀렸더라도 메모리/세션에 토큰이 유효하다면 인가 처리합니다.
  if (!isLogin && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * [인증 가드 컴포넌트]
 * 💡 쿠키 체계 리팩토링: 스토리지 토큰 조회를 제거하고, 
 * Redux 전역 상태의 로그인 여부(isLogin)만으로 페이지 접근 권한을 제한합니다.
 */
export default function ProtectedRoute() {
  const isLogin = useSelector((state: any) => state.auth.isLogin);

  // 로그인 상태가 아니라면 철저하게 로그인 페이지로 리다이렉트
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 상태라면 자식 라우트 활성화
  return <Outlet />;
}
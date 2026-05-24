import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "@/components/MainLayout";
import { getMe } from "@/api/auth"; 
import { setUser } from "../store/slices/authSlice"; 

export default function DashboardPage() {
  const dispatch = useDispatch();
  
  // 리덕스 전역 상태에서 현재 유저 정보 조회
  const currentUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    // 💡 새로고침 등으로 리덕스 전역 상태에 유저 정보가 유실되었다면 
    // 백엔드에 쿠키를 동반한 내 정보 조회(/auth/me)를 요청하여 복구합니다.
    if (!currentUser) {
      getMe()
        .then((userData) => {
          if (userData && userData.success) {
            dispatch(setUser(userData.user));
          }
        })
        .catch((err) => {
          console.error("인증 쿠키가 없거나 유저 정보 로드 실패:", err);
        });
    }
  }, [currentUser, dispatch]);

  return (
    <MainLayout>
      {/* 상단 환영 메시지 영역만 깔끔하게 유지 */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {currentUser?.username || "User"}!
        </h1>
        <p className="text-muted-foreground mt-1">Smart Admin Dashboard</p>
      </div>
      
      {/* 💡 추후 대시보드에 들어갈 메인 컨텐츠 컴포넌트들을 이 아래에 배치하시면 됩니다. */}
    </MainLayout>
  );
}
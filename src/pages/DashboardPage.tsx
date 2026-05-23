import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import MainLayout from "@/components/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { checkServerHealth, type HealthCheckResponse } from "@/api/health"
import { getMe } from "@/api/auth" // 💡 내 정보 조회 API 임포트
import { setUser } from "../store/slices/authSlice" // 💡 리듀서 액션 임포트

export default function DashboardPage() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state: any) => state.auth.user)
  
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // 💡 1. 만약 토큰은 있는데 리덕스에 유저 정보가 유실되었다면 (새로고침 등) 다시 가져와 채웁니다.
    if (!currentUser) {
      getMe()
        .then((userData) => {
          // 백엔드가 준 UserResponse 스펙 { success: true, user: { ... } } 에 맞춰 구조 분해
          if (userData.success) {
            dispatch(setUser(userData.user))
          }
        })
        .catch(() => console.error("유저 정보 로드 실패"))
    }

    // 2. 기존 서버 헬스체크 구동
    checkServerHealth()
      .then((data) => setHealthData(data))
      .catch((err) => console.error("Dashboard health fetch error:", err))
      .finally(() => setIsLoading(false))
  }, [currentUser, dispatch])

  const formatMB = (bytes?: number) => {
    if (!bytes) return "0 MB"
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const isServerUp = healthData?.status === "ok"

  return (
    <MainLayout>
      <div className="mb-6">
        {/* 💡 상단 타이틀에 현재 로그인한 유저 닉네임을 동적으로 바인딩합니다. */}
        <h1 className="text-3xl font-bold">
          Welcome back, {currentUser?.username || "Admin"}!
        </h1>
        <p className="text-muted-foreground mt-1">Smart Admin Dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* 기존 카드들 레이아웃 동일 유지... */}
      </div>
    </MainLayout>
  )
}
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { menuItems } from "@/router/menu"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logout } from "@/store/slices/authSlice" // 💡 더 이상 쓰지 않는 login 액션은 가져오지 않습니다.
import { removeToken } from "@/lib/auth" // 💡 로그아웃 시 프론트엔드 메모리/세션 토큰을 지우기 위해 임포트

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // 💡 부족했던 부분 채움: 최신 authSlice 구조에 맞게 user와 isLogin 상태를 구독합니다.
  const isLogin = useAppSelector((state) => state.auth.isLogin)
  const currentUser = useAppSelector((state) => state.auth.user)

  /**
   * 로그아웃 버튼을 눌렀을 때 실행되는 함수입니다.
   * 전역 리덕스 상태를 초기화하고, 프론트엔드에 저장된 Access Token을 삭제한 후 로그인 페이지로 튕겨냅니다.
   */
  const handleLogout = () => {
    dispatch(logout()) // 1. Redux 전역 유저 상태 초기화 (user: null, isLogin: false)
    removeToken()      // 2. 프론트엔드 Access Token 가드 해제
    navigate("/login") // 3. 로그인 창으로 안전하게 이동
  }

  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col min-h-screen">
      {/* 상단 레이아웃: 로고 및 메뉴 */}
      <div>
        {/* 서비스 타이틀 (로고) */}
        <h1 className="text-2xl font-bold mb-10 tracking-tight">
          SMART ADMIN
        </h1>

        {/* 메뉴 목록 영역 */}
        <nav className="space-y-2">
          {menuItems.map((menu) => {
            const Icon = menu.icon
            const isActive = location.pathname === menu.path

            return (
              <Link
                key={menu.path}
                to={menu.path}
                className={`
                  flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon size={18} />
                {menu.title}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* 하단 레이아웃: 인증 상태 및 유저 정보 표출 영역 */}
      <div className="mt-auto pt-6 border-t">
        {isLogin && currentUser ? (
          // [로그인 완료 상태인 경우] -> JWT 텍스트 대신 깔끔한 유저 프로필 박스와 로그아웃 버튼 배치
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 border">
              <p className="text-xs text-muted-foreground font-medium">현재 접속 계정</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5 break-all">
                {currentUser.username}
              </p>
              {/* 권한(Role) 배지 가이드 */}
              <span className="inline-block mt-1.5 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">
                {currentUser.role}
              </span>
            </div>

            <Button
              className="w-full"
              variant="destructive"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          // [비로그인 상태인 경우] -> 로그인 페이지로 다이렉트 이동하는 버튼 표출
          <Button
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        )}
      </div>
    </aside>
  )
}
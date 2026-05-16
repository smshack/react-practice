import {
  Link,
  useLocation,
} from "react-router-dom"

// shadcn/ui에서 제공하는 공통 Button 컴포넌트를 가져옵니다.
import { Button } from "@/components/ui/button"

// 효율화를 위해 분리해 두었던 메뉴 자동화 데이터(배열)를 가져옵니다.
import { menuItems } from "@/router/menu"

// 이전에 만든 타입 안전한 Redux 커스텀 훅을 가져옵니다.
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks"

// authSlice에서 상태 변경을 위해 정의한 login, logout 액션을 가져옵니다.
import {
  login,
  logout,
} from "@/store/slices/authSlice"

export default function Sidebar() {
  // 현재 브라우저의 URL 경로를 가져옵니다. (메뉴 활성화 하이라이트 표시용)
  const location = useLocation()

  // Redux 스토어에 액션을 보내기 위한 디스패치 함수를 초기화합니다.
  const dispatch = useAppDispatch()

  // useAppSelector를 통해 전역 상태 중 로그인 여부(isLogin)를 실시간으로 구독합니다.
  const isLogin =
    useAppSelector(
      (state) =>
        state.auth.isLogin
    )

  // useAppSelector를 통해 전역 상태 중 저장된 JWT 토큰 값을 실시간으로 구독합니다.
  const token =
    useAppSelector(
      (state) =>
        state.auth.token
    )

  /**
   * 로그인 버튼을 눌렀을 때 실행되는 함수입니다.
   * 실제 백엔드 API 통신 대신, 테스트용 고정 토큰을 스토어에 저장하는 가짜(Mock) 로그인 로직입니다.
   */
  function handleLogin() {
    // 실제로는 API 로그인 후 수신한 진짜 token을 저장하게 됩니다.
    dispatch(
      login("TEST_JWT_TOKEN")
    )
  }

  /**
   * 로그아웃 버튼을 눌렀을 때 실행되는 함수입니다.
   * 디스패치를 통해 스토어의 인증 정보(token, isLogin)를 초기화합니다.
   */
  function handleLogout() {
    dispatch(logout())
  }

  return (
    // flex-col과 mt-auto를 활용하여 메뉴 영역과 하단 로그인 영역을 위아래로 찢어 배치합니다.
    <aside className="w-64 border-r bg-background p-4 flex flex-col">

      {/* 상단 레이아웃: 로고 및 메뉴 */}
      <div>
        {/* 서비스 타이틀 (로고) */}
        <h1 className="text-2xl font-bold mb-10">
          SMART ADMIN
        </h1>

        {/* 메뉴 목록 영역: menuItems 배열을 기반으로 자동 반복 렌더링 */}
        <nav className="space-y-2">
          {menuItems.map((menu) => {
            const Icon = menu.icon

            // 현재 접속 중인 URL(location.pathname)과 메뉴의 설정 경로가 일치하는지 비교합니다.
            const isActive =
              location.pathname === menu.path

            return (
              <Link
                key={menu.path}
                to={menu.path}
                // 현재 활성화된 메뉴라면 shadcn 기본 강조색(bg-primary), 아니면 마우스 호버 효과만 부여합니다.
                className={`
                  flex items-center gap-2 rounded-lg px-3 py-2 transition-colors
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }
                `}
              >
                {/* 각 메뉴에 지정된 Lucide 아이콘 동적 렌더링 */}
                <Icon size={18} />
                {menu.title}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* 하단 레이아웃: 인증 상태 및 로그인/로그아웃 제어 버튼 */}
      {/* mt-auto를 주어 메뉴 개수와 상관없이 무조건 사이드바 맨 밑바닥에 밀착 고정됩니다. */}
      <div className="mt-auto pt-6">

        {/* 현재 상태 텍스트 가이드 */}
        <div className="mb-3 text-sm text-muted-foreground">
          {isLogin
            ? "로그인 상태"
            : "비로그인 상태"
          }
        </div>

        {/* 조건부 렌더링(삼항 연산자): 로그인 상태에 따라 다른 UI 표출 */}
        {isLogin ? (
          // [로그인 완료 상태인 경우] -> 토큰 정보와 로그아웃 버튼 표시
          <div className="space-y-2">
            {/* 글자가 영역 밖으로 깨져 나가지 않도록 break-all 처리된 토큰 뷰어 */}
            <div className="rounded-lg border p-3 text-xs break-all">
              {token}
            </div>

            <Button
              className="w-full"
              variant="destructive" // shadcn의 빨간색 위험 테마 적용
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          // [비로그인 상태인 경우] -> 로그인 유도 버튼 표시
          <Button
            className="w-full"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}

      </div>

    </aside>
  )
}
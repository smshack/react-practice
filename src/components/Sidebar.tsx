import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/router/menu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice"; 
import { logoutApi } from "@/api/auth"; // 🔑 백엔드 쿠키 파괴를 위한 API 임포트

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const currentUser = useAppSelector((state) => state.auth.user);

  /**
   * 로그아웃 버튼을 눌렀을 때 실행되는 함수입니다.
   * 💡 이제 백엔드로 먼저 요청을 보내 서버 로그를 찍고 쿠키를 삭제한 뒤, 프론트 상태를 초기화합니다.
   */
  const handleLogout = async () => {
    try {
      // 1. 백엔드 서버에 로그아웃 요청 (이제 서버 터미널에 로그가 정상적으로 찍힙니다!)
      await logoutApi();
    } catch (error) {
      console.error("서버 쿠키 만료 요청 실패:", error);
    } finally {
      // 2. 서버 응답이 성공하든 실패하든(토큰이 이미 만료되었든) 프론트엔드 상태는 깨끗이 청소합니다.
      dispatch(logout()); // Redux 초기화 (user: null, isLogin: false)
      navigate("/login"); // 로그인 창으로 이동
    }
  };

  return (
    <aside className="w-64 border-r bg-background p-4 flex flex-col min-h-screen">
      {/* 상단 레이아웃: 로고 및 메뉴 */}
      <div>
        <h1 className="text-2xl font-bold mb-10 tracking-tight">
          SMART ADMIN
        </h1>

        <nav className="space-y-2">
          {menuItems.map((menu) => {
            const Icon = menu.icon;
            const isActive = location.pathname === menu.path;

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
            );
          })}
        </nav>
      </div>

      {/* 하단 레이아웃: 인증 상태 및 유저 정보 표출 영역 */}
      <div className="mt-auto pt-6 border-t">
        {isLogin && currentUser ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-3 border">
              <p className="text-xs text-muted-foreground font-medium">현재 접속 계정</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5 break-all">
                {currentUser.username}
              </p>
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
          <Button
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        )}
      </div>
    </aside>
  );
}
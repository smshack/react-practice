import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/store/hooks" 
import { setUser } from "@/store/slices/authSlice" 
import { login, getMe } from "@/api/auth" 
import { setToken } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) return

    setIsLoading(true)
    try {
      // 1. BFF 로그인 API 호출
      const loginResponse = await login({ username, password })
      
      // 💡 [수정 포인트] loginResponse의 타입 구조에 맞춰 데이터 접근 방식을 단순화합니다.
      // API 호출 함수에서 이미 response.data를 풀어서 줬거나 인터페이스가 그렇게 잡혀있다면 바로 추출합니다.
      const accessToken = loginResponse?.accessToken

      if (!accessToken) {
        throw new Error("응답에 Access Token이 없습니다.")
      }

      // 2. 프론트엔드 인증 가드용 Access Token 적재
      setToken(accessToken)

      // 3. 새 토큰을 기반으로 백엔드에 내 정보(User) 조회 요청
      const meResponse = await getMe()
      
      if (meResponse && meResponse.success) {
        // 4. Redux 전역 상태에 유저 정보 세팅 (isLogin을 true로 켬)
        dispatch(setUser(meResponse.user))
        
        // 5. 모든 가드가 완벽히 통과되었으므로 대시보드로 안전하게 이동!
        navigate("/dashboard")
      } else {
        throw new Error("유저 정보를 불러오지 못했습니다.")
      }

    } catch (error) {
      console.error("로그인 프로세스 에러:", error)
      alert("아이디 또는 비밀번호를 확인해 주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">서비스 로그인</CardTitle>
          <CardDescription>
            계정 정보를 입력하여 시스템에 접속하세요.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            {/* 아이디 입력 영역 */}
            <div className="grid gap-2">
              <Label htmlFor="username">아이디</Label>
              <Input
                id="username"
                type="text"
                placeholder="ID를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            {/* 비밀번호 입력 영역 */}
            <div className="grid gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
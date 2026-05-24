import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks"; 
import { setUser } from "@/store/slices/authSlice"; 
import { login } from "@/api/auth"; // 💡 더 이상 getMe를 연속으로 두 번 찌를 필요가 없으므로 제거
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    try {
      // 1. 로그인 API 호출 (이 시점에 백엔드가 브라우저에 쿠키를 자동으로 구워줍니다)
      const loginResponse = await login({ username, password });
      
      // 2. 새로운 LoginResponse 스펙에 맞춰 성공 여부 판별
      if (loginResponse && loginResponse.success) {
        
        // 3. 바디에 함께 실려온 유저 프로필 정보를 Redux 전역 상태에 즉시 동기화
        dispatch(setUser(loginResponse.user));
        
        // 4. 대시보드로 안전하게 이동!
        navigate("/dashboard");
      } else {
        throw new Error("로그인 응답 처리에 실패했습니다.");
      }

    } catch (error) {
      console.error("로그인 프로세스 에러:", error);
      alert("아이디 또는 비밀번호를 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

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
  );
}
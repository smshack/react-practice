import api from "./api";
import type { LoginRequest, LoginResponse,  } from "@/types/auth"; // 💡 UserResponse 타입이 있다면 추가해 주세요.
import type { UserResponse } from "@/types/user"; // 💡 UserResponse 타입이 있다면 추가해 주세요.
/**
 * [사용자 로그인 처리 API]
 * @param data 사용자가 입력한 ID, Password (LoginRequest)
 * @returns 성공 시 토큰 쌍(Access, Refresh)이 담긴 응답 보장 (LoginResponse)
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  // 공통 api 인스턴스를 호출합니다.
  // <LoginResponse> 제네릭을 지정하여 결과값의 타입을 보장합니다.
  const response = await api.post<LoginResponse>("/auth/login", data, {
    headers: {
      // 💡 중요: 로그인 시점에는 토큰이 없으므로, 공통 Interceptor가 
      // 토큰 주입을 건너뛰도록 명시적인 가드 옵션을 부여합니다.
      Authorization: false,
    },
  });
  
  return response.data;
}

/**
 * [현재 로그인한 내 정보 조회 API]
 * headers 지정을 생략했으므로 공통 Interceptor에 의해 Bearer AccessToken이 자동으로 주입됩니다.
 */
export async function getMe(): Promise<UserResponse> {
  const response = await api.get<UserResponse>("/user/me");
  return response.data;
}
import api from "./api";
import type { LoginRequest, LoginResponse } from "@/types/auth"; 
import type { UserResponse, User } from "@/types/user"; 

/**
 * [사용자 로그인 처리 API]
 * 💡 이제 토큰은 응답 바디가 아닌 쿠키로 들어옵니다. 응답 바디의 유저 정보 프로필만 반환합니다.
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

/**
 * [현재 로그인한 내 정보 조회 API]
 * 자동으로 쿠키가 동반되므로 일반적인 GET 요청을 보냅니다.
 */
export async function getMe(): Promise<UserResponse> {
  const response = await api.get<UserResponse>("/auth/me");
  return response.data;
}

/**
 * [전체 사용자 목록 조회 API]
 */
export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>("/users");
  return response.data;
}

/**
 * [로그아웃 처리 API]
 * 💡 쿠키 체계에서는 프론트엔드 스토리지 청소뿐만 아니라 백엔드에 쿠키 파괴를 반드시 요청해야 합니다.
 */
export async function logoutApi(): Promise<{ success: boolean; message: string }> {
  const response = await api.post("/auth/logout");
  return response.data;
}
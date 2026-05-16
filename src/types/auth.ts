/**
 * 로그인 시 서버로 전송하는 요청 데이터 구조입니다.
 */
export interface LoginRequest {
  /** 사용자 계정 ID 또는 이메일 */
  username: string
  /** 사용자 비밀번호 */
  password: string
}

/**
 * 로그인 성공 시 서버에서 반환받는 데이터 구조입니다.
 */
export interface LoginResponse {
  /** * API 요청 시 인증 헤더에 사용할 단기 액세스 토큰.
   */
  accessToken: string

  /** * 액세스 토큰 만료 시 재발급을 위해 사용하는 장기 리프레시 토큰. 
   * (선택 사항이며, 보안을 위해 쿠키로 관리되기도 합니다.)
   */
  refreshToken?: string
}

/**
 * 전역 상태 관리(Redux, Zustand, Pinia 등)에서 사용하는 인증 상태 구조입니다.
 */
export interface AuthState {
  /** 현재 저장된 액세스 토큰 (로그아웃 상태일 경우 null) */
  token: string | null

  /** * 현재 사용자의 로그인 여부. 
   * UI에서 로그인/로그아웃 버튼을 분기 처리할 때 유용하게 사용됩니다.
   */
  isLogin: boolean
}
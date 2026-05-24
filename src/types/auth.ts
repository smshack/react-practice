/**
 * 로그인 시 서버로 전송하는 요청 데이터 구조입니다.
 */
export interface LoginRequest {
  /** 사용자 계정 ID */
  username: string;
  /** 사용자 비밀번호 */
  password: string;
}

/**
 * 로그인 성공 시 서버에서 반환받는 데이터 구조입니다.
 * 💡 백엔드가 토큰 쌍을 HttpOnly 쿠키로 직접 저장하므로, Response Body에서는 제거되었습니다.
 */
export interface LoginResponse {
  /** 요청 처리 성공 여부 */
  success: boolean;
  /** 백엔드에서 넘겨주는 유저 기본 인적 사항 프로필 */
  user: {
    id: number;
    username: string;
    role: string;
  };
}

/**
 * 전역 상태 관리(Redux, Zustand, Pinia 등)에서 사용하는 인증 상태 구조입니다.
 * 💡 보안을 위해 토큰 문자열은 보관하지 않으며, 오직 유저 프로필과 로그인 여부만 명시합니다.
 */
export interface AuthState {
  /** 현재 로그인한 유저의 정보 (로그아웃 상태일 경우 null) */
  user: LoginResponse['user'] | null;
  
  /** * 현재 사용자의 로그인 여부. 
   * UI에서 로그인/로그아웃 버튼 분기 및 라우터 가드(Router Guard) 처리 시 활용됩니다.
   */
  isLogin: boolean;
}


// LoginResponse 체질 개선: * 기존에 바디로 내려오던 accessToken과 refreshToken 필드를 완전히 제거했습니다.

// 백엔드 컨트롤러가 최종 반환하던 { success: true, user: { id, username, role } } 구조와 1:1 매칭되도록 인터페이스를 재설계했습니다.

// AuthState 보안 강화:

// 프론트엔드 메모리(Zustand, Redux 등)에 token 문자열을 보관하던 스펙(token: string | null)을 지웠습니다. 이제 토큰은 브라우저 쿠키 저장소가 독점 관리합니다.

// 대신 화면에 유저 이름이나 권한(Role)을 뿌려줄 수 있도록 user 객체 상태를 저장하도록 안전하게 확장했습니다.
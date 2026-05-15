/**
 * 애플리케이션에서 사용하는 환경 변수 설정 객체입니다.
 * * @description
 * Vite 환경에서는 클라이언트 측 코드에서 환경 변수에 접근하기 위해
 * `.env` 파일 내 변수명 앞에 반드시 `VITE_` 접두사가 붙어야 합니다.
 * (예: VITE_KEYCLOAK_URL=https://auth.example.com)
 * * @see https://vitejs.dev/guide/env-and-mode.html
 */
export const ENV = {
  /** Keycloak 인증 서버의 기본 URL */
  KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
}
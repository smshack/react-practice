/// <reference types="vite/client" />

/**
 * Vite 프로젝트에서 사용하는 환경 변수(Environment Variables)들의 타입을 정의하는 인터페이스입니다.
 * .env 파일에 정의된 변수 중 'VITE_'로 시작하는 변수들을 TypeScript가 인식할 수 있도록 합니다.
 */
interface ImportMetaEnv {
  /** * 백엔드 API 서버의 기본 URL 주소입니다.
   * @example "https://api.example.com"
   */
  readonly VITE_API_URL: string

  /** * 인증 및 인가 서버인 Keycloak의 기본 URL 주소입니다.
   * @example "https://auth.example.com"
   */
  readonly VITE_KEYCLOAK_URL: string

  /** * Keycloak에서 인증을 관리하는 독립된 작업 공간(Realm)의 이름입니다.
   * @example "my-application-realm"
   */
  readonly VITE_KEYCLOAK_REALM: string

  /** * Keycloak에 등록된 이 클라이언트(웹 애플리케이션)의 고유 ID입니다.
   * @example "frontend-client"
   */
  readonly VITE_KEYCLOAK_CLIENT_ID: string
}

/**
 * JavaScript 표준 내장 객체인 `import.meta`를 확장하는 인터페이스입니다.
 * 위에서 정의한 `ImportMetaEnv` 타입을 `import.meta.env` 속성에 연결해 줍니다.
 */
interface ImportMeta {
  /** 프로젝트 내부에서 환경 변수에 접근할 때 사용하는 객체입니다. (수정 불가능한 읽기 전용) */
  readonly env: ImportMetaEnv
}
/**
 * 애플리케이션의 사용자 정보를 정의하는 인터페이스입니다.
 */
export interface User {
  /** 사용자의 고유 식별 번호 (Primary Key) */
  id: number

  /** 사용자의 로그인 ID (백엔드 엔티티의 username과 매핑) */
  username: string

  /** 사용자의 권한 등급
   * @example 'ADMIN', 'USER'
   */
  role: string
}

/**
 * [내 정보 조회 API 최종 응답 인터페이스]
 * 백엔드 UserController의 getMe() 리턴 규격인 { success: true, user: { ... } } 구조를 완벽히 보장합니다.
 */
export interface UserResponse {
  /** API 호출 성공 여부 가드 플래그 */
  success: boolean

  /** 인증된 사용자 정보 객체 */
  user: User
}
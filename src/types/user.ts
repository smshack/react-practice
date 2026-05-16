/**
 * 애플리케이션의 사용자 정보를 정의하는 인터페이스입니다.
 */
export interface User {
  /** 사용자의 고유 식별 번호 (Primary Key) */
  id: number

  /** 사용자의 이름 또는 닉네임 */
  name: string

  /** 사용자의 이메일 주소 (주로 계정 아이디로 활용) */
  email: string

  /** * 사용자의 권한 등급 
   * @example 'ADMIN', 'USER', 'GUEST'
   */
  role: string
}
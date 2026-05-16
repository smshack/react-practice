/**
 * API 요청 시 제어할 수 있는 개별 옵션입니다.
 */
export interface RequestOptions {
  /** * 인증 토큰(Authorization 헤더) 포함 여부 
   * @default true (기본적으로 토큰 포함)
   */
  auth?: boolean
}

/**
 * 서버 응답의 표준 형식입니다. (제네릭 활용)
 * 모든 API 응답을 이 구조로 감싸면 일관된 처리가 가능합니다.
 * * @template T - 실제 데이터(data)의 타입
 */
export interface ApiResponse<T> {
  /** 요청 처리 성공 여부 */
  success: boolean
  /** 서버에서 반환하는 핵심 데이터 */
  data: T
  /** 에러 발생 시나 특정 상황에서의 안내 메시지 */
  message?: string
}

/**
 * 목록 조회(List) API에서 사용하는 페이지네이션 정보입니다.
 */
export interface Pagination {
  /** 현재 페이지 번호 (보통 0 또는 1부터 시작) */
  page: number
  /** 한 페이지당 보여줄 아이템 개수 */
  size: number
  /** 조건에 맞는 전체 아이템 개수 */
  total: number
}
/**
 * 숫자를 사용자의 로케일 설정에 맞춰 천 단위 구분 기호(,)가 포함된 문자열로 변환합니다.
 * * @param value - 포맷팅할 숫자
 * @returns 로케일 규칙에 따라 포맷팅된 문자열
 * * @example
 * formatNumber(1234567.89); // "1,234,567.89" (한국 기준)
 */
export function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value)
}

/**
 * 날짜 객체를 한국어(ko-KR) 기준의 날짜 및 시간 형식 문자열로 변환합니다.
 * * @param date - 포맷팅할 Date 객체
 * @returns "YYYY. M. D. 오전/오후 HH:MM" 형식의 문자열
 * * @example
 * formatDate(new Date()); // "2026. 5. 16. 오전 1:41"
 */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}
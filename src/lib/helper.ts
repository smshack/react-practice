/**
 * 설정한 밀리초(ms)만큼 실행을 일시 중지합니다.
 * 주로 비동기 흐름에서 의도적인 지연을 만들기 위해 사용합니다.
 * * @param ms - 중지할 시간 (1/1000초 단위)
 * @returns 지정된 시간 후에 완료되는 Promise
 * * @example
 * await sleep(2000); // 2초간 대기
 */
export function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  )
}

/**
 * 영문 소문자와 숫자가 섞인 8자리의 랜덤한 문자열 ID를 생성합니다.
 * 36진수 변환 방식을 사용하며, 간단한 UI 키값이나 임시 식별자로 적합합니다.
 * * @returns 8자리의 랜덤 문자열 (예: "a1b2c3d4")
 * * @example
 * const id = randomId(); // "5nx9k2z8"
 */
export function randomId() {
  return Math.random()
    .toString(36)
    .substring(2, 10)
}
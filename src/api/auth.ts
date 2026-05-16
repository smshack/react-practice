// @/api/client 경로에서 공통으로 정의된 HTTP POST 메서드 함수를 가져옵니다.
// 이 client는 기본적으로 토큰 주입(Interceptor) 등의 공통 로직이 처리되어 있을 가능성이 높습니다.
import {
  post,
} from "@/api/client"

// 로그인 요청(데이터 구조)과 응답(결과 구조)에 대한 TypeScript 타입을 가져옵니다.
// 'import type'을 사용하면 컴파일 시점에 타입 검사용으로만 쓰고 실제 자바스크립트 빌드 결과물에는 포함되지 않아 가볍습니다.
import type {
  LoginRequest,
  LoginResponse,
} from "@/types/auth"

/**
 * 사용자 로그인을 처리하는 비동기 함수입니다.
 * @param data 사용자가 입력한 ID, Password 등이 담긴 LoginRequest 타입의 객체
 * @returns 성공 시 서버에서 반환한 토큰 및 유저 정보가 담긴 LoginResponse 타입의 Promise 객체
 */
export async function login(
  data: LoginRequest,
) {

  // 공통 post 함수를 호출합니다. 
  // <LoginResponse> 제네릭을 지정하여 이 API의 결과값이 LoginResponse 타입임을 보장합니다.
  return post<LoginResponse>(
    "/auth/login", // 1. 요청할 API의 세부 엔드포인트(기본 URL 뒤에 붙는 경로)

    data,          // 2. 서버로 보낼 본문(Body) 데이터 (ID, 비밀번호 등)

    {
      // 3. Axios 요청 옵션(Config) 설정 항목입니다.
      // 로그인 API는 아직 인증되지 않은 상태에서 호출해야 하므로, 
      // 공통 Interceptor가 헤더에 'Bearer 토큰'을 자동으로 붙이지 않도록 예외 처리하는 옵션입니다.
      auth: false, 
    },
  )
}
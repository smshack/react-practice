// @/api/api 경로에서 사전 설정된 Axios 인스턴스를 가져옵니다.
import api from "@/api/api"

// API 요청 옵션(auth 여부 등)의 타입을 가져옵니다.
import {
  type RequestOptions,
} from "@/types/api"

/**
 * 1. 서버에 GET 요청을 보내는 공통 비동기 함수입니다.
 * @template T 서버로부터 응답받을 데이터의 TypeScript 타입 (제네릭)
 * @param url 요청할 API 엔드포인트 경로 (예: "/users")
 * @param options 인증 여부(auth) 등을 제어하기 위한 선택적 옵션 객체
 * @returns 서버가 응답한 본문 데이터(response.data)를 T 타입으로 반환하는 Promise
 */
export async function get<T>(
  url: string,

  options?: RequestOptions,
) {

  const response =
    await api.get<T>(url, {

      // 헤더 설정을 동적으로 주입합니다.
      headers: {
        // [핵심 로직] 옵션으로 auth: false가 명시적으로 들어왔다면,
        // 헤더의 Authorization 값을 false로 설정하여 공통 인터셉터의 토큰 주입을 차단합니다.
        // 옵션이 없다면 undefined를 주어 인터셉터가 기본 토큰을 넣을 수 있도록 비워둡니다.
        Authorization:
          options?.auth === false
            ? false
            : undefined,
      },
    })

  // Axios 응답 객체 전체가 아닌 실제 필요한 알맹이 데이터(body)만 꺼내서 반환합니다.
  return response.data
}

/**
 * 2. 서버에 POST 요청을 보내는 공통 비동기 함수입니다.
 * @template T 서버로부터 응답받을 데이터의 TypeScript 타입 (제네릭)
 * @param url 요청할 API 엔드포인트 경로 (예: "/auth/login")
 * @param data 서버로 전송할 본문(Body) 데이터 (객체, 배열 등)
 * @param options 인증 여부(auth) 등을 제어하기 위한 선택적 옵션 객체
 * @returns 서버가 응답한 본문 데이터(response.data)를 T 타입으로 반환하는 Promise
 */
export async function post<T>(
  url: string,
  
  data?: any, // 서버로 보낼 Body 데이터를 두 번째 인자로 받습니다.

  options?: RequestOptions, // 옵션(Config)은 항상 세 번째 인자로 전달됩니다.
) {

  const response =
    await api.post<T>(url, data, {

      headers: {
        // GET 함수와 동일하게 auth: false인 경우 인터셉터가 토큰을 넣지 못하도록 차단합니다.
        Authorization:
          options?.auth === false
            ? false
            : undefined,
      },
    })

  return response.data
}
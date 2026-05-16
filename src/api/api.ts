import axios from "axios"
import { ENV } from "@/lib/env"
import { getToken } from "@/lib/auth"

/**
 * 프로젝트 전역에서 사용할 공통 Axios 인스턴스입니다.
 */
const api = axios.create({
  // 환경 변수에서 가져온 API 기본 주소를 설정합니다.
  baseURL: ENV.API_URL,
  // 서버 응답이 10초(10000ms)를 초과하면 요청을 중단하고 에러를 발생시킵니다.
  timeout: 10000,
})

/**
 * [Request Interceptor]
 * 요청이 서버로 전송되기 직전에 실행되며, 조건부로 인증 토큰을 헤더에 추가합니다.
 */
api.interceptors.request.use(
  (config) => {
    // API 호출 시 headers.Authorization 값을 명시적으로 false로 설정하지 않았다면 인증을 사용하는 것으로 간주합니다.
    const useAuth = config.headers.Authorization !== false

    if (useAuth) {
      const token = getToken()

      // 토큰이 존재할 경우에만 Bearer 스킴으로 Authorization 헤더를 덮어씁니다.
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
)

export default api
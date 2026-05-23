import axios from "axios"
import { ENV } from "@/lib/env"
import { getToken, tokenStorage } from "@/lib/auth" // 💡 프로젝트의 실제 auth 헬퍼에 맞게 수정하세요.

/**
 * 프로젝트 전역에서 사용할 공통 Axios 인스턴스
 */
const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
})

/**
 * [Request Interceptor]
 * 요청이 서버로 전송되기 직전, 조건부로 토큰 탑재 여부를 판단합니다.
 */
api.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {} as any
    }

    // 💡 호출 시 'headers: { Authorization: false }'로 명시했다면 토큰 주입을 건너뜁니다.
    const useAuth = config.headers.Authorization !== false

    if (useAuth) {
      const token = getToken() // 또는 tokenStorage.getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } else {
      // 💡 백엔드(NestJS)로 'Authorization: false' 문자열이 그대로 전송되는 것을 방지하기 위해 제거합니다.
      delete config.headers.Authorization
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * [Response Interceptor]
 * 401 Unauthorized 에러 발생 시, 유저 모르게 Refresh Token으로 토큰을 갱신하고 기존 요청을 재시도합니다.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 💡 401 에러가 발생했고, 재시도(_retry)한 적이 없는 요청일 때만 무한 루프 방지 처리를 하며 진입합니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 1. 저장소에서 리프레시 토큰 추출
        const refreshToken = tokenStorage.getRefreshToken()
        
        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

        // 2. 새로운 토큰 쌍 재발급 요청 (인터셉터 순환에 걸리지 않도록 순수 axios 순정 객체 사용)
        const response = await axios.post(`${ENV.API_URL}/auth/refresh`, {
          refreshToken,
        })

        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken // 백엔드가 갱신해서 주면 함께 저장

        // 3. 브라우저 스토리지 갱신
        localStorage.setItem("accessToken", newAccessToken)
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken)
        }

        // 4. 실패했던 원래 요청의 헤더를 새 토큰으로 교체한 뒤 재실행
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
        
      } catch (refreshError) {
        // 💡 토큰 재발급마저 실패한 경우 (만료, 변조 등) 로그아웃 처리 및 로그인 페이지 강제 이동
        tokenStorage.clear()
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
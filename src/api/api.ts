import axios from "axios";
import { ENV } from "@/lib/env";

/**
 * 프로젝트 전역에서 사용할 공통 Axios 인스턴스
 * 💡 쿠키 기반 인증을 위해 모든 요청에 'withCredentials: true'를 기본 탑재합니다.
 */
const api = axios.create({
  baseURL: ENV.API_URL,
  timeout: 10000,
  withCredentials: true, // ★ 중요: 이 옵션이 켜져야 브라우저가 쿠키를 API 요청에 자동으로 동반합니다.
});

/**
 * [Response Interceptor]
 * 401 Unauthorized 에러 발생 시, 브라우저가 쥐고 있는 HttpOnly 쿠키(refreshToken)를 활용해
 * 조용히 Access Token 쿠키를 재발급(Refresh)하고 기존 요청을 재시도합니다.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 💡 401 에러가 발생했고, 재시도(_retry)한 적이 없는 요청일 때 무한 루프 방지 처리를 하며 진입합니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 💡 백엔드가 쿠키를 직접 읽으므로 바디에 아무것도 보낼 필요가 없습니다.
        // 대신 인터셉터 순환에 걸리지 않고 쿠키를 동반하도록 순정 axios 객체에 옵션을 주어 호출합니다.
        await axios.post(
          `${ENV.API_URL}/auth/refresh`,
          {}, // 빈 바디
          { withCredentials: true }
        );

        // 쿠키가 성공적으로 재발급(Overwrite)되었으므로 원래 실패했던 요청을 그대로 재시도합니다.
        return api(originalRequest);
        
      } catch (refreshError) {
        // 💡 쿠키 재발급마저 실패한 경우 (리프레시 토큰 만료 등) 로그인 페이지로 강제 이동시킵니다.
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
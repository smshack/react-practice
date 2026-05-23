import api from "./api"

/**
 * 백엔드(NestJS Terminus)의 실제 성공 응답(251바이트) 규격을 반영한 타입 정의입니다.
 */
export interface HealthCheckResponse {
  status: "ok" | "error" | "shutting_down"
  info: {
    [key: string]: { status: "up" | "down"; [key: string]: any }
  }
  error: {
    [key: string]: { status: "up" | "down"; [key: string]: any }
  }
  details: {
    [key: string]: { status: "up" | "down"; [key: string]: any }
  }
}

/**
 * 백엔드 서버의 활성 상태(HTTP 상태 코드 200)를 조회하는 헬스체크 API 함수입니다.
 * DevOps 모니터링 및 프론트엔드 대시보드 상태판 등에서 활용됩니다.
 * * @returns {Promise<HealthCheckResponse>} 서버 헬스체크 결과 데이터
 */
export async function checkServerHealth(): Promise<HealthCheckResponse> {
  try {
    // 💡 헬스체크는 비로그인 상태에서도 접근 가능해야 하므로 Authorization을 false로 끕니다.
    const response = await api.get<HealthCheckResponse>("/health", {
      headers: {
        Authorization: false,
      },
    })

    // 정상 응답(statusCode: 200)인 경우 데이터를 그대로 반환합니다.
    return response.data
  } catch (error) {
    // 서버가 죽었거나 네트워크가 끊겨 에러(500대 에러, ECONNREFUSED 등)가 발생했을 때의 예외 처리입니다.
    console.error("Health check failed:", error)
    
    // UI가 터지지 않도록 가짜 에러 상태 객체를 구조에 맞게 반환하여 프론트엔드 방어 코드를 작성합니다.
    return {
      status: "error",
      info: {},
      error: { server: { status: "down" } },
      details: { server: { status: "down" } },
    }
  }
}
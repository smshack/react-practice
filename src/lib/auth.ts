import { getStorage, removeStorage, setStorage } from "@/lib/storage"

/** 💡 실무 규격: 토큰 만료 및 갱신(Silent Refresh)을 위해 키를 명확히 분리합니다. */
const ACCESS_TOKEN_KEY = "accessToken"
const REFRESH_TOKEN_KEY = "refreshToken"

/**
 * [Access Token 제어 함수]
 * 단기 자격 증명용 엑세스 토큰을 관리합니다. (인터셉터 request 헤더 주입용)
 */
export function setToken(token: string) {
  setStorage(ACCESS_TOKEN_KEY, token)
}

export function getToken(): string | null {
  return getStorage<string>(ACCESS_TOKEN_KEY)
}

export function removeToken() {
  removeStorage(ACCESS_TOKEN_KEY)
}

/**
 * [Token Storage 객체 스펙]
 * api.ts 인터셉터 내부에서 'tokenStorage.getRefreshToken()' 및 
 * 예외 시 'tokenStorage.clear()'를 원활하게 호출할 수 있도록 구조화된 인터페이스를 제공합니다.
 */
export const tokenStorage = {
  /** 저장소에서 Refresh Token을 읽어옵니다. */
  getRefreshToken: (): string | null => {
    return getStorage<string>(REFRESH_TOKEN_KEY)
  },

  /** 새로운 Refresh Token이 발급되었을 때 스토리지를 갱신합니다. */
  setRefreshToken: (token: string): void => {
    setStorage(REFRESH_TOKEN_KEY, token)
  },

  /** 로그아웃 또는 토큰 조작 만료 발생 시 모든 인증 자격 증명을 전면 초기화합니다. */
  clear: (): void => {
    removeStorage(ACCESS_TOKEN_KEY)
    removeStorage(REFRESH_TOKEN_KEY)
  },
}
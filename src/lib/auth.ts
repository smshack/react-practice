import {
  getStorage,
  removeStorage,
  setStorage,
} from "@/lib/storage"

/** 인증 토큰을 저장할 로컬 스토리지 키 이름 */
const TOKEN_KEY = "token"

/**
 * 전달받은 인증 토큰을 로컬 스토리지에 저장합니다.
 * * @param token - 저장할 인증 토큰 문자열
 */
export function setToken(
  token: string,
) {
  setStorage(TOKEN_KEY, token)
}

/**
 * 로컬 스토리지에서 인증 토큰을 읽어옵니다.
 * * @returns 저장된 토큰 문자열 또는 없을 경우 null
 */
export function getToken() {
  return getStorage<string>(
    TOKEN_KEY,
  )
}

/**
 * 로컬 스토리지에 저장된 인증 토큰을 삭제합니다.
 * 주로 로그아웃 처리 시 사용됩니다.
 */
export function removeToken() {
  removeStorage(TOKEN_KEY)
}
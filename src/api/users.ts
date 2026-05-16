import { get } from "@/api/client"

/** * 사용자 정보를 나타내는 인터페이스 
 */
export interface User {
  /** 사용자의 고유 식별자 (ID) */
  id: number
  /** 사용자의 실명 또는 닉네임 */
  name: string
  /** 사용자의 이메일 주소 */
  email: string
}

/**
 * 서버에 저장된 전체 사용자 목록을 조회합니다.
 * * @returns 사용자 객체 배열 (User[])을 포함하는 Promise
 * @example
 * const users = await getUsers();
 * console.log(users[0].name); // 자동 완성 지원
 */
export async function getUsers() {
  // get 유틸리티에 <User[]> 제네릭을 전달하여 
  // 반환값의 타입을 명확하게 지정합니다.
  return get<User[]>(
    "/users",
  )
}
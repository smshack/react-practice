import { get } from "@/api/client"
import { type User } from "@/types/user"

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
/**
 * 로컬 스토리지에 데이터를 저장합니다.
 * 데이터를 저장하기 전 자동으로 JSON 문자열로 변환(serialize)합니다.
 * * @param key - 저장할 데이터의 고유 키
 * @param value - 저장할 값 (객체, 배열, 숫자 등 모든 타입 가능)
 * @example
 * setStorage('user_settings', { theme: 'dark', fontSize: 16 });
 */
export function setStorage(
  key: string,
  value: unknown,
) {
  localStorage.setItem(
    key,
    JSON.stringify(value),
  )
}

/**
 * 로컬 스토리지에서 데이터를 가져와 원래의 타입으로 복원합니다.
 * 제네릭 <T>를 사용하여 반환되는 데이터의 타입을 지정할 수 있습니다.
 * * @param key - 가져올 데이터의 고유 키
 * @returns 복원된 데이터 혹은 데이터가 없을 경우 null
 * @example
 * const settings = getStorage<{ theme: string }>('user_settings');
 * if (settings) console.log(settings.theme);
 */
export function getStorage<T>(
  key: string,
): T | null {
  const value = localStorage.getItem(key)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error)
    return null
  }
}

/**
 * 로컬 스토리지에서 특정 키에 해당하는 데이터를 삭제합니다.
 * * @param key - 삭제할 데이터의 고유 키
 * @example
 * removeStorage('user_settings');
 */
export function removeStorage(
  key: string,
) {
  localStorage.removeItem(key)
}
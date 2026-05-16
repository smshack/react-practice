export interface SelectOption {
  /**
   * 화면(UI)에 사용자에게 직접 보여지는 텍스트입니다.
   * 예: "대한민국", "남자", "선택하세요" 등
   */
  label: string

  /**
   * 서버로 전송되거나 시스템 내부 로직(코드)에서 처리할 실제 데이터 값입니다.
   * 주로 ID, 코드 형태를 가집니다.
   * 예: "KR", "M", "" 등
   */
  value: string
}
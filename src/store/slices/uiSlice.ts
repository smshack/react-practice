// Redux Toolkit에서 Slice 생성용 함수를 가져옵니다.
import {
  createSlice,
} from "@reduxjs/toolkit"

// 1. 이 슬라이스에서 관리할 UI 상태(State)의 타입을 정의합니다.
interface UiState {
  // 사이드바가 열려있는지(true) 닫혀있는지(false)를 나타내는 상태 값입니다.
  sidebarOpen: boolean
}

// 2. 앱이 처음 켜졌을 때 초기화될 UI 상태의 기본값(초기값)을 설정합니다.
// 기본적으로 사이드바가 열린 상태(true)로 시작하도록 설정되어 있습니다.
const initialState: UiState = {
  sidebarOpen: true,
}

/**
 * 3. UI 상태를 처리하는 Slice를 생성합니다.
 * 내부적으로 'ui/toggleSidebar' 같은 액션 타입이 자동으로 생성됩니다.
 */
const uiSlice = createSlice({
  name: "ui", // 슬라이스의 이름 (전역 스토어 및 액션 타입의 접두어로 사용됨)
  initialState, // 위에서 정의한 초기 상태 주입

  // 상태를 변경하는 함수(리듀서)들을 정의합니다.
  reducers: {
    /**
     * 토글 액션: 현재 사이드바 상태가 true면 false로, false면 true로 반전시킵니다.
     * 외부에서 dispatch(toggleSidebar()) 형태로 호출하면 실행됩니다.
     */
    toggleSidebar(state) {
      // Immer 라이브러리가 내장되어 있어 기존 값을 직접 반전(!state.sidebarOpen)시켜도 안전합니다.
      state.sidebarOpen =
        !state.sidebarOpen
    },
  },
})

// 컴포넌트(예: 헤더의 햄버거 버튼 등)에서 사이드바를 접고 펼칠 때 
// 액션을 일으킬 수 있도록 구조 분해 할당으로 내보냅니다.
export const {
  toggleSidebar,
} = uiSlice.actions

// store 설정 파일(configureStore)의 reducer.ui 항목에 등록하기 위해 리듀서를 default로 내보냅니다.
export default uiSlice.reducer
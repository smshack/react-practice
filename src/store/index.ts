// Redux Toolkit에서 Store를 생성하고 설정하기 위한 핵심 함수를 가져옵니다.
import {
  configureStore,
} from "@reduxjs/toolkit"

// 각각 인증(auth) 상태와 UI 상태(사이드바 열림/닫힘 등)를 관리하는 리듀서들을 가져옵니다.
import authReducer from "./slices/authSlice"
import uiReducer from "./slices/uiSlice"

/**
 * 애플리케이션의 전역 상태를 담는 Redux Store를 생성하고 내보냅니다.
 * configureStore는 Redux DevTools 연동 및 미들웨어 설정을 자동으로 처리해 줍니다.
 */
export const store =
  configureStore({
    // 애플리케이션의 여러 리듀서들을 하나로 결합(Combine)합니다.
    reducer: {
      // 이제 전역 상태에서 state.auth 구조로 인증 상태에 접근할 수 있습니다.
      auth: authReducer,

      // 이제 전역 상태에서 state.ui 구조로 UI 관련 상태에 접근할 수 있습니다.
      ui: uiReducer,
    },
  })

// ==========================================
// 여기서부터는 TypeScript를 위한 타입 정의 섹션입니다.
// ==========================================

/**
 * Store가 가지고 있는 전역 상태(State)의 전체 구조 타입을 정의합니다.
 * 컴포넌트나 커스텀 훅에서 `useSelector`로 상태를 꺼내올 때 이 타입을 기준으로 자동완성이 지원됩니다.
 * 예: state.auth.isLogin, state.ui.isSidebarOpen 등
 */
export type RootState =
  ReturnType<typeof store.getState>

/**
 * Store에 액션(Action)을 보내는 `dispatch` 함수의 타입을 정의합니다.
 * 비동기 미들웨어(Thunk) 등이 포함된 액션을 디스패치할 때 발생할 수 있는 타입 에러를 방지합니다.
 */
export type AppDispatch =
  typeof store.dispatch
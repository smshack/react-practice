// Redux Toolkit에서 Slice 생성용 함수와 액션 객체의 타입(PayloadAction)을 가져옵니다.
import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit"

// 1. 이 슬라이스에서 관리할 인증 상태(State)의 타입을 정의합니다.
interface AuthState {
  // 토큰이 있으면 string, 없으면 null 정보를 가집니다.
  token: string | null

  // 로그인 여부를 true/false로 판별합니다.
  isLogin: boolean
}

// 2. 앱이 처음 켜졌을 때 초기화될 인증 상태의 기본값(초기값)을 설정합니다.
const initialState: AuthState = {
  token: null,
  isLogin: false,
}

/**
 * 3. auth 상태를 처리하는 Slice를 생성합니다.
 * 내부적으로 'auth/login', 'auth/logout' 같은 액션 타입이 자동으로 생성됩니다.
 */
const authSlice = createSlice({
  name: "auth", // 슬라이스의 이름 (액션 타입의 접두어로 사용됨)
  initialState,  // 위에서 정의한 초기 상태 주입

  // 상태를 변경하는 함수(리듀서)들을 정의합니다.
  reducers: {
    /**
     * 로그인 액션: 로그인 성공 시 토큰을 저장하고 로그인 상태를 true로 바꿉니다.
     * @param action PayloadAction<string> 형태이며, payload로 JWT 토큰 문자열을 받습니다.
     */
    login(
      state,
      action: PayloadAction<string>, // 외부에서 dispatch(login("토큰문자열")) 형태로 보낸 값이 action.payload로 들어옵니다.
    ) {
      // Redux Toolkit은 내부적으로 Immer 라이브러리를 쓰기 때문에 
      // 원래 Redux와 달리 불변성을 신경 쓰지 않고 state를 직접 수정해도 안전합니다.
      state.token = action.payload
      state.isLogin = true
    },

    /**
     * 로그아웃 액션: 상태를 초기화하여 인증을 해제합니다.
     */
    logout(state) {
      state.token = null
      state.isLogin = false
    },
  },
})

// 컴포넌트단에서 액션을 일으킬 때(dispatch할 때) 사용할 수 있도록 구조 분해 할당으로 내보냅니다.
// 예: dispatch(login("token_abc")) 또는 dispatch(logout())
export const {
  login,
  logout,
} = authSlice.actions

// store 설정 파일(configureStore)에 등록하기 위해 리듀서를 default로 내보냅니다.
export default authSlice.reducer
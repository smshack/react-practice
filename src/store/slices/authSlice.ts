import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "@/types/user" // 💡 앞서 정의한 User 인터페이스 규격을 가져옵니다.

// 1. 이 슬라이스에서 관리할 인증 상태(State)의 타입을 정의합니다.
interface AuthState {
  /** 로그인한 사용자의 고유 정보 객체 (미로그인 시 null) */
  user: User | null
  
  /** 로그인 여부를 true/false로 판별합니다. */
  isLogin: boolean
}

// 2. 앱이 처음 켜졌을 때 초기화될 인증 상태의 기본값(초기값)을 설정합니다.
const initialState: AuthState = {
  user: null,
  isLogin: false,
}

/**
 * 3. auth 상태를 처리하는 Slice를 생성합니다.
 */
const authSlice = createSlice({
  name: "auth", 
  initialState,  

  reducers: {
    /**
     * [유저 정보 동기화 액션]
     * 💡 부족했던 부분 채움: 로그인 성공 직후나 새로고침 시 
     * 백엔드에서 받아온 유저 객체를 Redux 전역 상태에 채워 넣습니다.
     */
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.isLogin = true
    },

    /**
     * 로그아웃 액션: 상태를 초기화하여 인증을 해제합니다.
     */
    logout(state) {
      state.user = null
      state.isLogin = false
    },
  },
})

// DashboardPage 등 컴포넌트단에서 호출할 수 있도록 내보냅니다.
export const {
  setUser,
  logout,
} = authSlice.actions

export default authSlice.reducer
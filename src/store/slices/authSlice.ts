import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";

interface AuthState {
  /** 로그인한 사용자의 고유 정보 객체 (미로그인 시 null) */
  user: User | null;
  /** 로그인 여부를 true/false로 판별합니다. */
  isLogin: boolean;
}

const initialState: AuthState = {
  user: null,
  isLogin: false,
};

/**
 * 인증 상태를 처리하는 Redux Slice
 */
const authSlice = createSlice({
  name: "auth", 
  initialState,  
  reducers: {
    /**
     * [유저 정보 동기화 및 로그인 처리]
     * 로그인 성공 시 또는 새로고침(App 구동 시 getMe 호출 후) 유저 데이터를 전역에 채웁니다.
     */
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLogin = true;
    },

    /**
     * [로그아웃 완료 액션]
     * 컴포넌트단에서 logoutApi() 호출 성공 후, 이 액션을 디스패치하여 프론트엔드 상태를 청소합니다.
     */
    logout(state) {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
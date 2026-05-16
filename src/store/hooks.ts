// react-redux에서 제공하는 기본 상태 조회(useSelector) 및 액션 발행(useDispatch) 훅과
// useSelector의 타입을 지정하기 위한 TypedUseSelectorHook 타입을 가져옵니다.
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux"

// @/store(스토어 설정 파일)에서 전역 상태 타입(RootState)과
// 디스패치 타입(AppDispatch)을 가져옵니다. (이전에 'import type'으로 정의했던 것들입니다.)
import type {
  RootState,
  AppDispatch,
} from "@/store"

/**
 * 1. 타입이 지정된 커스텀 Dispatch 훅입니다.
 * 일반 useDispatch를 쓰면 비동기 미들웨어(Thunk) 액션을 디스패치할 때 타입 에러가 날 수 있습니다.
 * 이를 <AppDispatch> 제네릭이 주입된 useAppDispatch로 대체하여 thunk 액션도 안전하게 디스패치합니다.
 */
export const useAppDispatch =
  () => useDispatch<AppDispatch>()

/**
 * 2. 타입이 지정된 커스텀 Selector 훅입니다.
 * 일반 useSelector를 쓰면 state의 타입을 알 수 없어서 `(state: RootState) => state.auth` 처럼 
 * 매번 매개변수에 타입을 적어야 하지만, 이 훅을 쓰면 state의 전체 구조를 이미 알고 있어서
 * `(state) => state.auth` 만 입력해도 전역 상태들이 자동으로 추천(자동완성)됩니다.
 */
export const useAppSelector:
  TypedUseSelectorHook<RootState> =
    useSelector
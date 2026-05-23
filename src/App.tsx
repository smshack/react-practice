import Router from "@/router/Router" // 💡 작성한 라우터 컴포넌트 임포트

export default function App() {
  // 다른 복잡한 레이아웃 없이 라우터가 최상단에서 화면을 통제해야 합니다.
  return <Router />
}
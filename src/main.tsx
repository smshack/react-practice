// 리액트 18 이상에서 DOM에 루트 노드를 생성하고 렌더링하기 위한 모듈을 가져옵니다.
import ReactDOM from 'react-dom/client'

// 앱 전체에 적용될 글로벌 스타일시트(Tailwind CSS 설정 등)를 불러옵니다.
import './index.css'

// 애플리케이션의 메인 레이아웃 및 라우터가 포함된 최상위 컴포넌트를 가져옵니다.
import App from './App'

// 리액트 컴포넌트들에게 Redux 스토어 상태를 전파해 주는 공급자(Provider) 컴포넌트를 가져옵니다.
import { Provider } from "react-redux"

// 이전에 configureStore로 생성했던 전역 상태 저장소(스토어) 인스턴스를 가져옵니다.
import { store } from "@/store"

/**
 * public/index.html 파일에 있는 <div id="root"></div> 엘리먼트를 찾아 
 * 리액트 애플리케이션을 구동할 뿌리(Root)를 생성합니다.
 * ! (Non-null assertion) 연산자는 '이 엘리먼트는 절대 null이 아니다'라고 TypeScript에 알리는 역할입니다.
 */
ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  // <Provider>로 최상위 컴포넌트인 <App />을 감싸줍니다.
  // 이렇게 하면 하위에 레이어링되는 모든 컴포넌트(Dashboard, Users, Settings 등)에서
  // 이전에 만든 useAppSelector, useAppDispatch 훅을 사용할 수 있게 됩니다.
  <Provider store={store}>
    <App />
  </Provider>
)
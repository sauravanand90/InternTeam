import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Header } from './components/life_cycle/DidMount.jsx'
import { HeaderDerive } from './components/life_cycle/DerivedState.jsx';
import { GetSnap } from './components/life_cycle/GetSnap.jsx'
import { Container } from './components/life_cycle/UnMount.jsx'
import Gallery from './components/props/Gallery.jsx'
import FavouriteColor from './components/Fav_Color_hooks/FavColor_hooks.jsx'
import PrevState from './components/hooks/useRef_hook.jsx'
import Counter from './components/hooks/useEffect_hook.jsx'
import Component1 from './components/hooks/useContext_hook.jsx'
import App1_useMemo from './components/hooks/App1_useMemo.jsx'
import Callback_hook from './components/hooks/useCallback_hook.jsx'
import ExpensiveComponent from './components/hooks/ExpensiveComponent.jsx'
import TodoReducerList from './components/hooks/Reducer_todo.jsx'
import Reducer_count from './components/hooks/Reducer_count.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <App />
  <Header />
  <HeaderDerive favcol="yellow"/>
  <GetSnap />
  <Container />
  <Gallery />
  <FavouriteColor />
  <Counter />
  <Component1 />
  <PrevState /> */}
  {/* <App1_useMemo /> */}
  {/* <Callback_hook /> */}
  {/* <ExpensiveComponent /> */}
  {/* <TodoReducerList /> */}
  <Reducer_count />
  </StrictMode>,
)



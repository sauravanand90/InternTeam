import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lifecycle from "./components/lifecycle_methods/Lifecycle";
import Updating from './components/lifecycle_methods/Lifecycle';
import UseState from "./components/ReactHooks/UseState.jsx";
import UseState2 from './components/ReactHooks/UseState2.jsx';
import UseEffect from './components/ReactHooks/UseEffect.jsx';
import UseRef from './components/ReactHooks/UseRef.jsx';
import UseMemo from './components/ReactHooks/UseMemo.jsx';
import UseCallback from './components/ReactHooks/UseCallback.jsx';
import ContextProvider from './context/AppContext.jsx';
import UseContext from './components/ReactHooks/UseContext.jsx';
import UseReducer from './components/ReactHooks/UseReducer.jsx';
import Navigation from './components/ReactNavigation/Navigation.jsx';
import Navbar from './components/ReactNavigation/Navbar.jsx';
import Redux from './components/redux/Redux.jsx'
import { Provider } from 'react-redux'
import { store } from './components/redux/store.jsx'
import { CalStore} from './components/redux_calculator/CalStore.jsx'
import Cal from './components/redux_calculator/Cal.jsx';

createRoot(document.getElementById('root')).render(
    <>
    {/* <App /> */}
    {/* <Lifecycle /> */}
    {/* <Updating />  */}
    {/* <UseState /> */}
    {/* <UseState2 /> */}
    {/* <UseEffect /> */}
    {/* <UseRef /> */}
    {/* <UseMemo /> */}
    {/* <UseCallback /> */}
    {/* <ContextProvider>
        <UseContext />
    </ContextProvider> */}
    {/* <UseReducer /> */}
    {/* <Navigation /> */}
    {/* <Provider store={store}>
        <Redux />
    </Provider> */}
    <Provider store={CalStore}>
        <Cal />
    </Provider>
    </>
)

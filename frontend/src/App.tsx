import './styles/App.css'
import {Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import routes from "./router/routes.ts";
import MainPage from "./pages/MainPage/MainPage.tsx";

function App() {

    return (
        <Routes>
            <Route index element={<AuthPage/>}/>
            <Route path={routes.main} element={<MainPage/>}/>
        </Routes>
    )
}

export default App

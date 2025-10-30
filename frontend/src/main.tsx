import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import ruRU from "antd/locale/ru_RU";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={{
            token: {
                fontFamily: 'Rubik, -apple-system, BlinkMacSystemFont, sans-serif'
            },
            components: {
                Button: {
                    defaultHoverBorderColor: "#ff9d00",
                    defaultHoverColor: "#ff9d00",
                    defaultBorderColor: "#f1cc86",
                    colorBgContainer: "#ffe6cc"
                }
            }
        }} locale={ruRU}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </ConfigProvider>
    </StrictMode>,
)

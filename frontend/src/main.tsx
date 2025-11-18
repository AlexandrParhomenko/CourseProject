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
                fontFamily: 'Rubik, -apple-system, BlinkMacSystemFont, sans-serif',
                colorPrimary: "#ff9d00",
            },
            components: {
                Button: {
                    defaultHoverBorderColor: "#ff9d00",
                    defaultHoverColor: "#ff9d00",
                    defaultBorderColor: "#f1cc86",
                    colorBgContainer: "#ffe6cc",
                    colorLink: '#b9b9b9',
                    colorLinkHover: '#6c6c6c',
                    colorLinkActive: '#a2a2a2'
                },
                Form: {
                    labelColor: "#949494",
                },
                Select: {
                    activeBorderColor: "#ff9d00",
                    hoverBorderColor: "#ff9d00"
                },
                DatePicker: {
                    activeBorderColor: "#ff9d00",
                    hoverBorderColor: "#ff9d00",
                    activeShadow: "#ff9d00",
                    addonBg: "#ff9d00",
                    cellHoverBg: "#ff9d00",
                    cellActiveWithRangeBg: "#ff9d00",
                    cellHoverWithRangeBg: "#ff9d00",
                    cellRangeBorderColor: "#ff9d00",
                }
            }
        }} locale={ruRU}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ConfigProvider>
    </StrictMode>,
)

import {useNavigate} from "react-router-dom";
import routes from "@router/routes.ts";

const ExitBtn = () => {
    const navigate = useNavigate();
    return (
        <span onClick={() => {
            sessionStorage.removeItem("token")
            navigate(routes.auth)
        }} className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
    );
};

export default ExitBtn;
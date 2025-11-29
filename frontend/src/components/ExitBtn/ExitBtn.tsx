import {useNavigate} from "react-router-dom";
import routes from "@router/routes.ts";
import {useUserStore} from "@/store/store.ts";

const ExitBtn = () => {
    const navigate = useNavigate();
    const { clearUser } = useUserStore();
    return (
        <span onClick={() => {
            clearUser()
            sessionStorage.removeItem("token")
            navigate(routes.auth)
        }} className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
    );
};

export default ExitBtn;
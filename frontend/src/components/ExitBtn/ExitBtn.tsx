import {useNavigate} from "react-router-dom";
import routes from "@router/routes.ts";
import {useUserStore} from "@/store/store.ts";
import {getAbbreName} from "@/utils.ts";
import {Flex} from "antd";

const ExitBtn = () => {
    const navigate = useNavigate();
    const {user} = useUserStore();
    const { clearUser } = useUserStore();
    return (
      <Flex gap={20}>
        {user && <span className={"font-bold duration-300"}>{getAbbreName(user.fullname)}</span>}
        <span onClick={() => {
          clearUser()
          sessionStorage.removeItem("token")
          navigate(routes.auth)
        }} className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
      </Flex>

    );
};

export default ExitBtn;
import {Flex} from "antd";
import MenuItem from "../MainPage/MenuItem.tsx";
import routes from "../../router/routes.ts";
import {useNavigate} from "react-router-dom";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const ObjectWorkersList = () => {
    document.title = "Список лиц на объекте";
    const navigate = useNavigate();

    return (
        <Flex vertical align={"center"} gap={40} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6 mb-20"}>
                <BackBtn onClick={() => navigate(routes.main)}/>
                <span className={"font-bold"}>Список лиц на объекте</span>
                <ExitBtn/>
            </div>
            <MenuItem onClick={() => navigate(routes.author_review_specs)} title={"Специалисты, осуществляющие авторский надзор"}/>
            <MenuItem onClick={() => navigate(routes.reg_visit_list)} title={"Регистрационный лист посещения объекта"}/>
            <MenuItem onClick={() => navigate(routes.organisations)} title={"Организации, управляющие и осуществляющие СМР"}/>
        </Flex>
    );
};

export default ObjectWorkersList;
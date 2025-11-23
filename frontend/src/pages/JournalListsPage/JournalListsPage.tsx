import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import MenuItem from "../MainPage/MenuItem.tsx";
import {Flex} from "antd";
import {useNavigate} from "react-router-dom";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const JournalListsPage = () => {
    document.title = "Списки для заполнения";
    const navigate = useNavigate();

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6 mb-20"}>
                <BackBtn onClick={() => navigate(routes.main)}/>
                <span className={"font-bold"}>Списки для заполнения</span>
                <ExitBtn/>
            </div>
            <MenuItem onClick={() => navigate(routes.building_objects)} title={"Объекты строительства"}/>
            <MenuItem onClick={() => navigate(routes.markings_short_names)} title={"Сокращенное наименование марок"}/>
            <MenuItem onClick={() => navigate(routes.discipline_short_names)} title={"Сокращенное наименование дисциплин"}/>
            <MenuItem onClick={() => navigate(routes.srd_by_block)} title={"Блоки СРД"}/>
            <MenuItem onClick={() => navigate(routes.srd_marking)} title={"Марки СРД"}/>
            <MenuItem onClick={() => navigate(routes.work_types)} title={"Перечень основных видов работ"}/>
            <MenuItem onClick={() => navigate(routes.doc_types)} title={"Виды документов"}/>
            <MenuItem onClick={() => navigate(routes.retreats_importance)} title={"Значимость отступлений, нарушений"}/>
        </Flex>
    );
};

export default JournalListsPage;
import {Button, DatePicker, Flex, Form, Popover} from "antd";
import MenuItem from "./MenuItem.tsx";
import {RiFileList3Line} from "react-icons/ri";
import {useState} from "react";
import AddUserModal from "./AddUserModal.tsx";
import SetRolesModal from "./SetRolesModal.tsx";
import {useNavigate} from "react-router-dom";
import routes from "../../router/routes.ts";
import ContractsModal from "../JournalListsPage/ContractsModal.tsx";
import type {ModalType} from "@/types/types.ts";

const MainPage = () => {
    document.title = "Главная";
    const {RangePicker} = DatePicker;
    const navigate = useNavigate();
    const [isAddUser, setIsAddUser] = useState<boolean>(false);
    const [addUserType, setAddUserType] = useState<ModalType>("create");
    const [isSetRole, setIsSetRole] = useState<boolean>(false);
    const [roleType, setRoleType] = useState<ModalType>("create");
    const [showContracts, setShowContracts] = useState<boolean>(false);

    return <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
        <AddUserModal type={addUserType} isShow={isAddUser} onClose={() => setIsAddUser(false)}/>
        <SetRolesModal type={roleType} isShow={isSetRole} onClose={() => setIsSetRole(false)}/>
        <ContractsModal isShow={showContracts} onClose={() => setShowContracts(false)}/>
        <div className={"flex justify-between w-full p-6 mb-20"}>
            <div></div>
            <span className={"font-bold"}>Главная</span>
            <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
        </div>
        <div className={"flex align-center gap-3"}>
            <Popover placement={"bottom"} trigger={"click"} content={<div className={"flex flex-col text-center gap-3"}>
                <span className={"font-bold"}>Новый отчет</span>
                <Form layout={"vertical"}>
                    <Form.Item name={'asd'} label={"Период отчета"}>
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item>
                        <Button className={"w-full"} htmlType="submit">Сформировать отчет</Button>
                    </Form.Item>
                </Form>
            </div>}>
                <div
                    className={"flex flex-col w-[120px] mr-5 items-center font-bold text-center duration-300 cursor-pointer flex-wrap"}>
                    <RiFileList3Line size={40} className={"text-gray-600"}/>
                    <span className={"text-gray-600"}>Сформировать сводный отчет</span>
                </div>
            </Popover>

            <div onClick={() => setShowContracts(true)}
                className={"flex items-center w-[120px] border rounded-md p-4 text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
                Новый договор
            </div>
            <div onClick={() => {
                setAddUserType("create")
                setIsAddUser(true)
            }}
                 className={"flex items-center border rounded-md p-4 w-[140px] text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
                Новый пользователь
            </div>
            <div onClick={() => {
                setRoleType("create")
                setIsSetRole(true)
            }}
                 className={"flex items-center w-[120px] border rounded-md p-4 text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
                Назначить роли
            </div>
            <div onClick={() => {
                setAddUserType("update")
                setIsAddUser(true)
            }}
                 className={"flex items-center border rounded-md p-4 w-[140px] text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
                Изменить пользователя
            </div>
            <div onClick={() => {
                setRoleType("update")
                setIsSetRole(true)
            }}
                 className={"flex items-center w-[120px] border rounded-md p-4 text-center border-yellow-500 bg-white cursor-pointer duration-300 hover:bg-yellow-400"}>
                Изменить роли
            </div>
        </div>
        <MenuItem onClick={() => navigate(routes.supervision_journal)} title={"Электронный журнал авторского надзора"}/>
        <MenuItem onClick={() => navigate(routes.itd_registry)} title={"Реестр ИТД"}/>
        <MenuItem onClick={() => navigate(routes.solutions_registry)} title={"Реестр технических решений"}/>
        <MenuItem onClick={() => navigate(routes.object_workers_list)} title={"Список лиц на объекте"}/>
        <MenuItem onClick={() => navigate(routes.consultations)} title={"Консультации на объекте"}/>
        <MenuItem onClick={() => navigate(routes.journal_lists)} title={"Списки для заполнения"}/>
    </Flex>
};

export default MainPage;
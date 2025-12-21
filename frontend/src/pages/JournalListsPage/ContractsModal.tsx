import {Button, Modal, Table} from "antd";
import {type FC, useState} from "react";
import type {ColumnType} from "antd/es/table";
import CreateContractModal from "./CreateContractModal.tsx";
import SetRolesModal from "../MainPage/SetRolesModal.tsx";
import type {ModalType} from "@/types/types.ts";
import {useGetAllContracts} from "@/services/api/contracts/contracts.ts";

interface IProps {
    isShow: boolean
    onClose: Function
}

const ContractsModal: FC<IProps> = ({isShow, onClose}) => {
    const [isCreateContract, setIsCreateContract] = useState<boolean>(false)
    const [isUpdateUser, setIsUpdateUser] = useState<boolean>(false)
    const [userModalType, setUserModalType] = useState<ModalType>("create")
    const {data: contracts} = useGetAllContracts()
    const columns: ColumnType<any>[] = [
        {
            width: 100,
            align: "center",
            title: '№',
            dataIndex: 'key',
            key: 'key',
        },
        {
            align: "center",
            title: 'Номер договора',
            dataIndex: 'number_contract',
            key: 'number_contract'
        }
    ]

    const onRow = () => {
        return {
            onChange: () => {
            },
            onDoubleClick: () => {
            }
        };
    };

    return (
        <Modal width={"50%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <CreateContractModal isShow={isCreateContract} onClose={() => setIsCreateContract(false)}/>
            <SetRolesModal isShow={isUpdateUser} onClose={() => setIsUpdateUser(false)} type={userModalType}/>
            <div className={"flex flex-col"}>
                <span className={"font-bold text-center"}>Договоры</span>
                <div className={"flex gap-2 py-2"}>
                    <Button onClick={() => setIsCreateContract(true)}>Новая запись</Button>
                    <Button onClick={() => {
                        setUserModalType("update")
                        setIsUpdateUser(true)
                    }}>Изменить администратора</Button>
                </div>
                <Table className={"w-full"}
                       onRow={() => onRow()}
                       pagination={false}
                       dataSource={contracts && contracts.map((el, idx) => ({
                           ...el,
                           key: idx + 1
                       }))}
                       columns={columns}/>
            </div>
        </Modal>
    );
};

export default ContractsModal;
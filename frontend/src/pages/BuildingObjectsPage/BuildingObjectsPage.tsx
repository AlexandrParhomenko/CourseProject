import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Flex, Table} from "antd";
import ContractsModal from "../JournalListsPage/ContractsModal.tsx";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import type {ColumnType} from "antd/es/table";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import CreateObjectModal from "./CreateObjectModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const BuildingObjectsPage = () => {
    document.title = "Объекты строительства";
    const navigate = useNavigate();
    const [showContracts, setShowContracts] = useState<boolean>(false);
    const [isCreateObject, setIsCreateObject] = useState<boolean>(false);
    const columns: ColumnType<any>[] = [
        {
            width: 100,
            align: "center",
            title: '№',
            dataIndex: 'dr_school_sname',
            key: 'dr_school_sname',
        },
        {
            align: "center",
            title: 'Номер договора',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Номер объекта',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Сокращенное наименование объекта',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Полное наименование объекта',
            dataIndex: 'phone1',
            key: 'phone1'
        }
    ]

    const onRow = (record: any) => {
        return {
            onChange: () => {
                console.log(record)
            },
            onDoubleClick: () => {
            }
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <ContractsModal isShow={showContracts} onClose={() => setShowContracts(false)}/>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Объекты строительства</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => setIsCreateObject(true)}
                             btnName={"Новая запись"}
                             refetch={() => {}}
                             pickedPerson={"object"} id={0}
                             deleteFunc={() => {}}
                             deleteFuncError={false}
                             children={<CreateObjectModal onClose={() => setIsCreateObject(false)} isShow={isCreateObject}/>}
                             deleteEntity={"объект"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    dataSource={[]}
                    summary={() => {
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>Всего: 0</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default BuildingObjectsPage;
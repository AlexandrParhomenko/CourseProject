import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import WorkTypesModal from "./WorkTypesModal.tsx";
import type {TypeWork} from "@/types/types.ts";
import {useDeleteTypeWork, useGetAllTypeWorks} from "@/services/api/type-works/type-works.ts";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const WorkTypesPage = () => {
    document.title = "Перечень основных видов работ";
    const navigate = useNavigate();
    const [isCreateWorkType, setIsCreateWorkType] = useState<boolean>(false);
    const [pickedTypeWork, setPickedTypeWork] = useState<TypeWork>({} as TypeWork);
    const {data, isLoading, refetch} = useGetAllTypeWorks();
    const {mutateAsync: deleteTypeWork, isError: isDeleteError} = useDeleteTypeWork();
    const columns: ColumnType<TypeWork & { key: number }>[] = [
        {
            width: 50,
            align: "center",
            title: "№",
            dataIndex: "key",
            key: "key",
        },
        {
            align: "center",
            title: "ID вида работ",
            dataIndex: "type_work_id",
            key: "type_work_id",
        },
        {
            align: "center",
            title: "Категория работ",
            dataIndex: "category_work",
            key: "category_work",
        },
        {
            align: "center",
            title: "Тип работы",
            dataIndex: "type_work",
            key: "type_work",
        },
        {
            align: "center",
            title: "Наименование работы",
            dataIndex: "name_work",
            key: "name_work",
        },
    ];

    const onRow = (record: TypeWork & { key: number }) => {
        return {
            onChange: () => {
                setPickedTypeWork(record);
            },
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Перечень основных видов работ</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
            <TableHeader pickedEntity={pickedTypeWork.type_work}
                    handleModalOpen={() => setIsCreateWorkType(true)}
                    btnName={"Новая запись"}
                    refetch={() => refetch()}
                    pickedPerson={"type-work"}
                    id={pickedTypeWork.type_work_id}
                    deleteFunc={async () => {
                        if (!pickedTypeWork.type_work_id) return;
                        await deleteTypeWork(pickedTypeWork.type_work_id);
                    }}
                    deleteFuncError={isDeleteError}
                    pickedRow={pickedTypeWork ?? undefined}
                    setPickedRow={setPickedTypeWork}
                    children={
                        <WorkTypesModal
                            onClose={() => setIsCreateWorkType(false)}
                            isShow={isCreateWorkType}
                            picked={pickedTypeWork ?? undefined}
                        />
                    }
                    deleteEntity={"вид работ"}
                />
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={{ position: ["bottomCenter"], defaultPageSize: 25 }}
                    scroll={{ y: "58vh" }}
                    loading={isLoading}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
                    summary={() => {
                        const total = data?.length ?? 0;
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>Общее количество записей: {total}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    columns={columns}
                />
            </div>
        </Flex>
    );
};

export default WorkTypesPage;
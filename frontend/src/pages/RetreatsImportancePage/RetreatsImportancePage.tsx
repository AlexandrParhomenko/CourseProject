import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import RetreatsImportanceModal from "./RetreatsImportanceModal.tsx";
import type {Defect} from "@/types/types.ts";
import {useDeleteDefect, useGetAllDefects} from "@/services/api/defects/defects.ts";

const RetreatsImportancePage = () => {
    document.title = "Значимость отступления, нарушения";
    const navigate = useNavigate();
    const [isCreateWorkType, setIsCreateWorkType] = useState<boolean>(false);
    const [pickedDefect, setPickedDefect] = useState<Defect>({} as Defect);
    const {data, isLoading, refetch} = useGetAllDefects();
    const {mutateAsync: deleteDefect, isError: isDeleteError} = useDeleteDefect();
    const columns: ColumnType<Defect & { key: number }>[] = [
        {
            width: 100,
            align: "center",
            title: "№",
            dataIndex: "key",
            key: "key",
        },
        {
            align: "center",
            title: "ID значимости",
            dataIndex: "importance_defect_id",
            key: "importance_defect_id",
        },
        {
            align: "center",
            title: "Значимость отступления, нарушения",
            dataIndex: "importance_defect",
            key: "importance_defect",
        },
    ];

    const onRow = (record: Defect & { key: number }) => {
        return {
            onChange: () => {
                setPickedDefect(record);
            },
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Значимость отступления, нарушения</span>
                <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader pickedEntity={pickedDefect.importance_defect}
                    handleModalOpen={() => setIsCreateWorkType(true)}
                    btnName={"Новая запись"}
                    refetch={() => refetch()}
                    pickedPerson={"defect"}
                    id={pickedDefect.importance_defect_id}
                    deleteFunc={async () => {
                        if (!pickedDefect.importance_defect_id) return;
                        await deleteDefect(pickedDefect.importance_defect_id);
                    }}
                    deleteFuncError={isDeleteError}
                    pickedRow={pickedDefect ?? undefined}
                    setPickedRow={setPickedDefect}
                    children={
                        <RetreatsImportanceModal
                            onClose={() => setIsCreateWorkType(false)}
                            isShow={isCreateWorkType}
                            picked={pickedDefect ?? undefined}
                        />
                    }
                    deleteEntity={"значимость"}
                />
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    loading={isLoading}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
                    summary={() => {
                        const total = data?.length ?? 0;
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>
                                        Общее количество записей: {total}
                                    </Table.Summary.Cell>
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

export default RetreatsImportancePage;
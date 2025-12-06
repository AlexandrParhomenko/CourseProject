import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import DocTypesModal from "./DocTypesModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import type {TypeDoc} from "@/types/types.ts";
import {useDeleteTypeDoc, useGetAllTypeDocs} from "@/services/api/type-docs/type-docs.ts";

const DocTypesPage = () => {
    document.title = "Виды документов в составе ИТД";
    const navigate = useNavigate();
    const [isCreateDocType, setIsCreateDocType] = useState<boolean>(false);
    const [pickedDocType, setPickedDocType] = useState<TypeDoc>({} as TypeDoc);
    const {data, isLoading, refetch} = useGetAllTypeDocs();
    const {mutateAsync: deleteTypeDoc, isError: isDeleteError} = useDeleteTypeDoc();
    const columns: ColumnType<TypeDoc & { key: number }>[] = [
        {
            width: 100,
            align: "center",
            title: "№",
            dataIndex: "key",
            key: "key",
        },
        {
            align: "center",
            title: "ID вида документа",
            dataIndex: "type_doc_id",
            key: "type_doc_id",
        },
        {
            align: "center",
            title: "Вид документа",
            dataIndex: "type_doc",
            key: "type_doc",
        },
    ];

    const onRow = (record: TypeDoc & { key: number }) => {
        return {
            onChange: () => {
                setPickedDocType(record);
            },
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Виды документов в составе ИТД</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader pickedEntity={pickedDocType.type_doc}
                    handleModalOpen={() => setIsCreateDocType(true)}
                    btnName={"Новая запись"}
                    refetch={() => refetch()}
                    pickedPerson={"type-doc"}
                    id={pickedDocType.type_doc_id}
                    deleteFunc={async () => {
                        if (!pickedDocType.type_doc_id) return;
                        await deleteTypeDoc(pickedDocType.type_doc_id);
                    }}
                    deleteFuncError={isDeleteError}
                    pickedRow={pickedDocType ?? undefined}
                    setPickedRow={setPickedDocType}
                    children={
                        <DocTypesModal
                            onClose={() => setIsCreateDocType(false)}
                            isShow={isCreateDocType}
                            picked={pickedDocType ?? undefined}
                        />
                    }
                    deleteEntity={"вид документа"}
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

export default DocTypesPage;

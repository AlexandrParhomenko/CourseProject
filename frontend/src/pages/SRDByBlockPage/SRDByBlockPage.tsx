import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import SRDByBlockModal from "./SRDByBlockModal.tsx";
import {roleStore} from "@/store/store.ts";
import type {Block} from "@/types/types.ts";
import {useDeleteBlock, useGetBlocksByContractId} from "@/services/api/blocks/blocks.ts";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const SrdByBlockPage = () => {
    document.title = "СРД по блокам";
    const navigate = useNavigate();
    const [isCreateSrd, setIsCreateSrd] = useState<boolean>(false);
    const {role} = roleStore();
    const [pickedBlock, setPickedBlock] = useState<Block>({} as Block);
    const {data, isLoading, refetch} = useGetBlocksByContractId(role?.contract_id);
    const {mutateAsync: deleteBlock, isError: isDeleteError} = useDeleteBlock();
    const columns: ColumnType<Block & { key: number }>[] = [
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
            dataIndex: 'contract',
            key: 'contract',
            render: (_, record) => record.contract?.number_contract
        },
        {
            align: "center",
            title: 'Обозначение блока',
            dataIndex: 'designation_block',
            key: 'designation_block'
        },
        {
            align: "center",
            title: 'Наименование блока',
            dataIndex: 'name_block',
            key: 'name_block'
        },
        {
            align: "center",
            title: 'Примечание',
            dataIndex: 'note_block',
            key: 'note_block'
        }
    ]

    const onRow = (record: Block & { key: number }) => {
        return {
            onChange: () => {
                setPickedBlock(record);
            },
            onDoubleClick: () => {
            }
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>СРД по блокам</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => setIsCreateSrd(true)}
                             btnName={"Новая запись"} pickedEntity={pickedBlock.name_block}
                             refetch={() => refetch()}
                             pickedPerson={"block"}
                             id={pickedBlock.block_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 if (!pickedBlock.block_id) return;
                                 await deleteBlock({id: pickedBlock.block_id, contract_id: role.contract_id});
                             }}
                             deleteFuncError={isDeleteError}
                             pickedRow={pickedBlock ?? undefined}
                             setPickedRow={setPickedBlock}
                             children={<SRDByBlockModal
                                 onClose={() => setIsCreateSrd(false)}
                                 isShow={isCreateSrd}
                                 picked={pickedBlock ?? undefined}
                             />}
                             deleteEntity={"сущность"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={{ position: ["bottomCenter"], defaultPageSize: 50 }}
                    loading={isLoading}
                    scroll={{ y: "58vh" }}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
                    summary={() => {
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell align={"center"} index={2}>Общее количество записей: {data ? data.length : 0}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default SrdByBlockPage;
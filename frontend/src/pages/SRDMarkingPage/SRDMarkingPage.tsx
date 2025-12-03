import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import SRDMarkingModal from "./SRDMarkingModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import type {Brand} from "@/types/types.ts";
import {useDeleteBrand, useGetBrandsByContractId} from "@/services/api/brands/brands.ts";
import {roleStore} from "@/store/store.ts";
import type {ModalType} from "@/types/types.ts";

const SrdMarkingPage = () => {
    document.title = "Марки";
    const navigate = useNavigate();
    const [isCreateMarking, setIsCreateMarking] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [pickedBrand, setPickedBrand] = useState<Brand | null>(null);
    const {role} = roleStore();

    const {data, isLoading, refetch} = useGetBrandsByContractId(role?.contract_id);
    const {mutateAsync: deleteBrand, isError: isDeleteError} = useDeleteBrand();

    const columns: ColumnType<Brand & { key: number }>[] = [
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
            key: 'contract_number',
            render: (_, record) => record.contract?.number_contract || '-'
        },
        {
            align: "center",
            title: 'Сокращенное наименование объекта',
            dataIndex: 'object',
            key: 'abbreve_name_object',
            render: (_, record) => record.object?.abbreve_name_object || record.object?.full_name_object || '-'
        },
        {
            align: "center",
            title: 'Номер объекта',
            dataIndex: 'object',
            key: 'number_object',
            render: (_, record) => record.object?.number_object || '-'
        },
        {
            align: "center",
            title: 'Титул',
            dataIndex: 'title',
            key: 'title'
        },
        {
            align: "center",
            title: 'Дисциплина',
            dataIndex: 'discipline',
            key: 'discipline',
            render: (_, record) => record.discipline?.discipline || '-'
        },
        {
            align: "center",
            title: 'Марка РД',
            dataIndex: 'abbreve_brand',
            key: 'abbreve_brand',
            render: (_, record) => record.abbreve_brand?.abbreve_brand || '-'
        },
        {
            align: "center",
            title: 'Секция (СМБ)',
            dataIndex: 'sections',
            key: 'sections'
        },
        {
            align: "center",
            title: 'Подсекция',
            dataIndex: 'subsection',
            key: 'subsection'
        },
        {
            align: "center",
            title: 'Полный шифр марки',
            dataIndex: 'full_brand_code',
            key: 'full_brand_code'
        },
        {
            align: "center",
            title: 'Наименование марки',
            dataIndex: 'name_brand',
            key: 'name_brand'
        },
        {
            align: "center",
            title: 'Примечание',
            dataIndex: 'note',
            key: 'note'
        },
        {
            align: "center",
            title: 'Шифр блока СРД',
            dataIndex: 'block',
            key: 'block_designation',
            render: (_, record) => record.block?.designation_block || '-'
        }
    ]

    const onRow = (record: Brand & { key: number }) => {
        return {
            onClick: () => {
                setPickedBrand(record);
            },
            onDoubleClick: () => {
                setModalType("update");
                setIsCreateMarking(true);
            }
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Марки</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create");
                    setIsCreateMarking(true);
                }}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"brand"}
                             id={{id: pickedBrand?.brand_id}}
                             deleteFunc={async ({id}: {id: number}) => {
                                 if (!role?.contract_id) return;
                                 await deleteBrand({
                                     brand_id: id,
                                     contract_id: role.contract_id
                                 });
                             }}
                             deleteFuncError={isDeleteError}
                             pickedRow={pickedBrand ?? undefined}
                             setPickedRow={setPickedBrand}
                             children={<SRDMarkingModal
                                 type={modalType}
                                 onClose={() => setIsCreateMarking(false)}
                                 isShow={isCreateMarking}
                                 picked={pickedBrand ?? undefined}
                             />}
                             deleteEntity={"марку"}/>
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
                                    <Table.Summary.Cell index={2}>Общее количество записей: {total}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    scroll={{ x: 3000 }}
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default SrdMarkingPage;
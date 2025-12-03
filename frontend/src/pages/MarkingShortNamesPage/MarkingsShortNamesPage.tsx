import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import CreateMarkingModal from "./CreateMarkingModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import type {AbbreveBrand} from "@/types/types.ts";
import {useGetAllAbbreveBrands} from "@/services/api/abbreve-brand/abbreve-brand.ts";

const MarkingsShortNamesPage = () => {
    document.title = "Сокращенное наименование марок";
    const navigate = useNavigate();
    const [isCreateMarking, setIsCreateMarking] = useState<boolean>(false);
    const [pickedAbbreveBrand, setPickedAbbreveBrand] = useState<AbbreveBrand | null>(null);

    const {data, isLoading, refetch} = useGetAllAbbreveBrands();

    const columns: ColumnType<AbbreveBrand & { key: number }>[] = [
        {
            width: 100,
            align: "center",
            title: "№",
            dataIndex: "key",
            key: "key",
        },
        {
            align: "center",
            title: "ID",
            dataIndex: "abbreve_brand_id",
            key: "abbreve_brand_id",
        },
        {
            align: "center",
            title: "Сокращенное наименование марки",
            dataIndex: "abbreve_brand",
            key: "abbreve_brand",
        },
        {
            align: "center",
            title: "Направление/вид нарушения",
            dataIndex: "direction_e_violation",
            key: "direction_e_violation",
        },
    ];

    const onRow = (record: AbbreveBrand & { key: number }) => {
        return {
            onClick: () => {
                setPickedAbbreveBrand(record);
            },
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Сокращенное наименование марок</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader
                    handleModalOpen={() => setIsCreateMarking(true)}
                    btnName={"Новая запись"}
                    refetch={() => refetch()}
                    pickedPerson={"abbreve-brand"}
                    id={{id: pickedAbbreveBrand?.abbreve_brand_id}}
                    // В бекенде для abbreve-brand пока нет delete, поэтому заглушка
                    deleteFunc={async () => {}}
                    deleteFuncError={false}
                    pickedRow={pickedAbbreveBrand ?? undefined}
                    setPickedRow={setPickedAbbreveBrand}
                    children={
                        <CreateMarkingModal
                            onClose={() => setIsCreateMarking(false)}
                            isShow={isCreateMarking}
                            picked={pickedAbbreveBrand ?? undefined}
                        />
                    }
                    deleteEntity={"запись"}
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
                                    <Table.Summary.Cell index={2}>Всего: {total}</Table.Summary.Cell>
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

export default MarkingsShortNamesPage;
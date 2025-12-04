import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import DisciplineShortNamesModal from "./DisciplineShortNamesModal.tsx";
import type {Discipline} from "@/types/types.ts";
import {useDeleteDiscipline, useGetAllDisciplines} from "@/services/api/disciplines/disciplines.ts";

const DisciplineShortNamesPage = () => {
    document.title = "Сокращенное наименование дисциплин";
    const navigate = useNavigate();
    const [isCreateShortName, setIsCreateShortName] = useState<boolean>(false);
    const [pickedDiscipline, setPickedDiscipline] = useState<Discipline>({} as Discipline);
    const {data, isLoading, refetch} = useGetAllDisciplines();
    const {mutateAsync: deleteDiscipline, isError: isDeleteError} = useDeleteDiscipline();
    const columns: ColumnType<Discipline & { key: number }>[] = [
        {
            width: 100,
            align: "center",
            title: '№',
            dataIndex: 'key',
            key: 'key',
        },
        {
            align: "center",
            title: 'ID дисциплины',
            dataIndex: 'discipline_id',
            key: 'discipline_id'
        },
        {
            align: "center",
            title: 'Шифр дисциплины',
            dataIndex: 'discipline',
            key: 'discipline'
        }
    ]
    const onRow = (record: Discipline & { key: number }) => {
        return {
            onChange: () => {
                setPickedDiscipline(record);
            },
            onDoubleClick: () => {
            }
        };
    };

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Сокращенное наименование дисциплин</span>
                v
            </div>
            <div className={"w-full p-6"}>
                <TableHeader pickedEntity={pickedDiscipline.discipline} handleModalOpen={() => setIsCreateShortName(true)}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"discipline"}
                             id={pickedDiscipline.discipline_id}
                             deleteFunc={async () => {
                                 if (!pickedDiscipline.discipline_id) return;
                                 await deleteDiscipline(pickedDiscipline.discipline_id);
                             }}
                             deleteFuncError={isDeleteError}
                             pickedRow={pickedDiscipline ?? undefined}
                             setPickedRow={setPickedDiscipline}
                             children={<DisciplineShortNamesModal
                                 onClose={() => setIsCreateShortName(false)}
                                 isShow={isCreateShortName}
                                 picked={pickedDiscipline ?? undefined}
                             />}
                             deleteEntity={"наименование"}/>
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

export default DisciplineShortNamesPage;
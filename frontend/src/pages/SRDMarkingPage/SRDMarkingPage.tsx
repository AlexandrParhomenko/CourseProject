import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import SRDMarkingModal from "./SRDMarkingModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const SrdMarkingPage = () => {
    document.title = "Марки";
    const navigate = useNavigate();
    const [isCreateMarking, setIsCreateMarking] = useState<boolean>(false);
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
            title: 'Сокращенное наименование объекта',
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
            title: 'Титул',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Дисциплина',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Марка РД',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Секция (СМБ)',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Подсекция',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Полный шифр марки',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Наименование марки',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Примечание',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Шифр блока СРД',
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
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.journal_lists)}/>
                <span className={"font-bold"}>Марки</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => setIsCreateMarking(true)}
                             btnName={"Новая запись"}
                             refetch={() => {}}
                             pickedPerson={"object"} id={0}
                             deleteFunc={() => {}}
                             deleteFuncError={false}
                             children={<SRDMarkingModal onClose={() => setIsCreateMarking(false)} isShow={isCreateMarking}/>}
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
                                    <Table.Summary.Cell index={2}>Общее количество записей: 0</Table.Summary.Cell>
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
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ColumnType} from "antd/es/table";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import SRDByBlockModal from "./SRDByBlockModal.tsx";

const SrdByBlockPage = () => {
    document.title = "СРД по блокам";
    const navigate = useNavigate();
    const [isCreateSrd, setIsCreateSrd] = useState<boolean>(false);
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
            title: 'Обозначение блока',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Наименование блока',
            dataIndex: 'phone1',
            key: 'phone1'
        },
        {
            align: "center",
            title: 'Примечание',
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
                <span className={"font-bold"}>СРД по блокам</span>
                <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => setIsCreateSrd(true)}
                             btnName={"Новая запись"}
                             refetch={() => {}}
                             pickedPerson={"object"} id={0}
                             deleteFunc={() => {}}
                             deleteFuncError={false}
                             children={<SRDByBlockModal onClose={() => setIsCreateSrd(false)} isShow={isCreateSrd}/>}
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
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default SrdByBlockPage;
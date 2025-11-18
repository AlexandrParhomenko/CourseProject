import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Flex, Table} from "antd";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import RetreatsImportanceModal from "./RetreatsImportanceModal.tsx";
import {retreatsImportanceColumns} from "@/constants/table_columns/table_columns.tsx";

const RetreatsImportancePage = () => {
    document.title = "Значимость отступления, нарушения";
    const navigate = useNavigate();
    const [isCreateWorkType, setIsCreateWorkType] = useState<boolean>(false);


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
                <span className={"font-bold"}>Значимость отступления, нарушения</span>
                <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => setIsCreateWorkType(true)}
                             btnName={"Новая запись"}
                             refetch={() => {}}
                             pickedPerson={"object"} id={0}
                             deleteFunc={() => {}}
                             deleteFuncError={false}
                             children={<RetreatsImportanceModal onClose={() => setIsCreateWorkType(false)} isShow={isCreateWorkType}/>}
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
                    columns={retreatsImportanceColumns}/>
            </div>
        </Flex>
    );
};

export default RetreatsImportancePage;
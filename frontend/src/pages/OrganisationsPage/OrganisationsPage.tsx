import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ModalType} from "@typings/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, Flex, Form, Input, Popover, Select, Table, Tooltip} from "antd";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import {FaFilter} from "react-icons/fa";
import type {ColumnType} from "antd/es/table";
import OrganisationsModal from "@pages/OrganisationsPage/OrganisationsModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const OrganisationsPage = () => {
    document.title = "Реестр организаций";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm()

    const columns: ColumnType<any>[] = [
        {
            width: 20,
            align: "center",
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            align: "center",
            title: 'Участники проекта',
            dataIndex: 'project_participant',
            key: 'project_participant',
        },
        {
            align: "center",
            title: 'Организация',
            dataIndex: 'organisation',
            key: 'organisation',
        },
        {
            align: "center",
            title: 'ФИО контактного лица',
            dataIndex: 'contact_fio',
            key: 'contact_fio',
        },
        {
            align: "center",
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
        },
        {
            align: "center",
            title: 'Подразделение',
            dataIndex: 'department',
            key: 'department',
        },
        {
            align: "center",
            title: 'Контактный номер',
            dataIndex: 'contact_number',
            key: 'contact_number',
        },
    ]

    const onRow = (record: any) => {
        return {
            onChange: () => {
                console.log(record)
            },
            onDoubleClick: () => {
                setModalType("update")
                setJournalModalOpen(true)
            }
        };
    };

    const filterOps = (
        <div className={"w-full p-2"}>
            <Form form={form} scrollToFirstError={{
                behavior: "smooth",
                block: "center",
                inline: "center"
            }} onFinish={() => {
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"w-[400px]"}>
                    <Form.Item name={"project_participant"} label={"Участники проекта"}>
                        <Input allowClear placeholder={"Участники проекта"}/>
                    </Form.Item>
                    <Form.Item name={"organisation"} label={"Организация"}>
                        <Input allowClear placeholder={"Организация"}/>
                    </Form.Item>
                    <Form.Item name={"contact_fio"} label={"ФИО контактного лица"}>
                        <Input allowClear placeholder={"ФИО контактного лица"}/>
                    </Form.Item>
                    <Form.Item name={"position"} label={"Должность"}>
                        <Input allowClear placeholder={"Должность"}/>
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button htmlType="submit" type={"link"} className={"mr-2"} onClick={() => {
                        form.resetFields();
                        setOpenFilter(false);
                    }}>Сбросить</Button>
                    <Button htmlType="submit">Применить</Button>
                </Form.Item>
            </Form>
        </div>
    );

    return (
        <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
            <div className={"flex justify-between w-full p-6"}>
                <BackBtn onClick={() => navigate(routes.object_workers_list)}/>
                <span className={"font-bold"}>Реестр организаций</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }}
                             btnName={"Новая запись"}
                             refetch={() => {
                             }}
                             pickedPerson={"object"} id={0}
                             deleteFunc={() => {
                             }}
                             filterOps={<Popover trigger={"click"}
                                                 content={filterOps}
                                                 placement="bottom" onOpenChange={() => setOpenFilter(!openFilter)}
                                                 open={openFilter}>
                                 <Tooltip title={"Фильтр"} placement={"bottom"}>
                                     <div
                                         className={"cursor-pointer flex items-center duration-300 hover:bg-gray-50 p-3 rounded-full"}>
                                         <FaFilter color={"#494949"}/>
                                     </div>
                                 </Tooltip>
                             </Popover>}
                             deleteFuncError={false}
                             children={<OrganisationsModal type={modalType}
                                                                onClose={() => setJournalModalOpen(false)}
                                                                isShow={JournalModalOpen}/>}
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
                                    <Table.Summary.Cell index={2}>Записей: 0</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default OrganisationsPage;













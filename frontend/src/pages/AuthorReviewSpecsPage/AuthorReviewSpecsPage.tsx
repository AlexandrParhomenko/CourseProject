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
import AuthorReviewSpecsModal from "@pages/AuthorReviewSpecsPage/AuthorReviewSpecsModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {roleStore} from "@/store/store.ts";
import type {Specialist} from "@/types/types.ts";
import {
    useDeleteSpecialist,
    useGetSpecialistsByContractId
} from "@/services/api/specialists/specialists.ts";

const AuthorReviewSpecsPage = () => {
    document.title = "Реестр специалистов авторского надзора";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {role} = roleStore();
    const [pickedSpecialist, setPickedSpecialist] = useState<Specialist | null>(null);

    const {data, isLoading, refetch} = useGetSpecialistsByContractId(role?.contract_id);
    const {mutateAsync: deleteSpecialist, isError: isDeleteError} = useDeleteSpecialist();

    const columns: ColumnType<Specialist & { key: number }>[] = [
        {
            width: 20,
            align: "center",
            title: '№',
            dataIndex: 'key',
            key: 'key',
        },
        {
            align: "center",
            title: 'ФИО',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            align: "center",
            title: 'Должность',
            dataIndex: 'post_specialist',
            key: 'post_specialist',
        },
        {
            align: "center",
            title: 'Номер телефона',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            align: "center",
            title: 'Вид работы, по которой осуществляется авторский надзор',
            dataIndex: 'type_work',
            key: 'type_work',
        },
        {
            align: "center",
            title: 'Номер документа о полномочиях по проведению авторского надзора. Приказ №___',
            dataIndex: 'number_doc',
            key: 'number_doc',
        },
        {
            align: "center",
            title: 'Дата документа о полномочиях по проведению авторского надзора. Приказ от ______.',
            dataIndex: 'date_doc',
            key: 'date_doc',
        },
    ]

    const onRow = (record: Specialist & { key: number }) => {
        return {
            onClick: () => {
                setPickedSpecialist(record);
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
                    <Form.Item name={"fio"} label={"ФИО"}>
                        <Input allowClear placeholder={"ФИО"}/>
                    </Form.Item>
                    <Form.Item name={"position"} label={"Должность"}>
                        <Input allowClear placeholder={"Должность"}/>
                    </Form.Item>
                    <Form.Item name={"work_type"} label={"Вид работы"}>
                        <Select allowClear placeholder={"Вид работы"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"order_number"} label={"Номер приказа"}>
                        <Input allowClear placeholder={"Номер приказа"}/>
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
                <span className={"font-bold"}>Реестр специалистов авторского надзора</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"specialist"} id={{id: pickedSpecialist?.specialist_id}}
                             deleteFunc={async ({id}: {id: number}) => {
                                 if (!role?.contract_id) return;
                                 await deleteSpecialist({id, contract_id: role.contract_id});
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
                             deleteFuncError={isDeleteError}
                             pickedRow={pickedSpecialist ?? undefined}
                             setPickedRow={setPickedSpecialist}
                             children={<AuthorReviewSpecsModal
                                 type={modalType}
                                 onClose={() => setJournalModalOpen(false)}
                                 isShow={JournalModalOpen}
                                 picked={pickedSpecialist ?? undefined}
                             />}
                             deleteEntity={"объект"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    loading={isLoading}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
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

export default AuthorReviewSpecsPage;





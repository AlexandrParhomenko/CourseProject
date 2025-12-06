import {useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
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
import dayjs from "dayjs";

const AuthorReviewSpecsPage = () => {
    document.title = "Реестр специалистов авторского надзора";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {role} = roleStore();
    const [pickedSpecialist, setPickedSpecialist] = useState<Specialist>({} as Specialist);
    const {data, isLoading, refetch} = useGetSpecialistsByContractId(role?.contract_id);
    const {mutateAsync: deleteSpecialist, isError: isDeleteError} = useDeleteSpecialist();
    const [filters, setFilters] = useState<{
        fio?: string;
        position?: string;
        work_type?: string;
        order_number?: string;
    }>({});
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
            render: (_: any, record) => {
                return (
                  <div>{dayjs(record.date_doc).format("DD.MM.YYYY")}</div>
                )
            }
        },
    ]

    const onRow = (record: Specialist & { key: number }) => {
        return {
            onChange: () => {
                setPickedSpecialist(record);
            },
            onDoubleClick: () => {
                setPickedSpecialist(record)
                setModalType("update")
                setJournalModalOpen(true)
            }
        };
    };

    // Получаем уникальные виды работ из данных для Select
    const workTypes = useMemo(() => {
        if (!data) return [];
        const uniqueTypes = new Set<string>();
        data.forEach(specialist => {
            if (specialist.type_work && specialist.type_work.trim()) {
                uniqueTypes.add(specialist.type_work);
            }
        });
        return Array.from(uniqueTypes).sort();
    }, [data]);

    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter((specialist) => {
            // Фильтр по ФИО
            if (filters.fio && filters.fio.trim()) {
                const fullname = specialist.fullname?.toLowerCase() || '';
                const filterValue = filters.fio.toLowerCase().trim();
                if (!fullname.includes(filterValue)) {
                    return false;
                }
            }
            
            // Фильтр по должности
            if (filters.position && filters.position.trim()) {
                const post = specialist.post_specialist?.toLowerCase() || '';
                const filterValue = filters.position.toLowerCase().trim();
                if (!post.includes(filterValue)) {
                    return false;
                }
            }
            
            // Фильтр по виду работы
            if (filters.work_type && filters.work_type.trim()) {
                const typeWork = specialist.type_work?.toLowerCase() || '';
                const filterValue = filters.work_type.toLowerCase().trim();
                if (!typeWork.includes(filterValue)) {
                    return false;
                }
            }
            
            // Фильтр по номеру приказа
            if (filters.order_number && filters.order_number.trim()) {
                const numberDoc = specialist.number_doc?.toString() || '';
                const filterValue = filters.order_number.trim();
                if (!numberDoc.includes(filterValue)) {
                    return false;
                }
            }
            
            return true;
        });
    }, [data, filters]);

    const filterOps = (
        <div className={"w-full p-2"}>
            <Form form={form} scrollToFirstError={{
                behavior: "smooth",
                block: "center",
                inline: "center"
            }} onFinish={(values) => {
                setFilters({
                    fio: values.fio || undefined,
                    position: values.position || undefined,
                    work_type: values.work_type || undefined,
                    order_number: values.order_number || undefined,
                });
                setOpenFilter(false);
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"w-[400px]"}>
                    <Form.Item name={"fio"} label={"ФИО"}>
                        <Input allowClear placeholder={"ФИО"}/>
                    </Form.Item>
                    <Form.Item name={"position"} label={"Должность"}>
                        <Input allowClear placeholder={"Должность"}/>
                    </Form.Item>
                    <Form.Item name={"work_type"} label={"Вид работы"}>
                        <Select allowClear placeholder={"Вид работы"} showSearch filterOption={(input, option) => {
                            const value = typeof option?.value === 'string' ? option.value : String(option?.value ?? '');
                            return value.toLowerCase().includes(input.toLowerCase());
                        }}>
                            {workTypes.map(type => (
                                <Select.Option key={type} value={type}>
                                    {type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"order_number"} label={"Номер приказа"}>
                        <Input allowClear placeholder={"Номер приказа"}/>
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button htmlType="button" type={"link"} className={"mr-2"} onClick={() => {
                        form.resetFields();
                        setFilters({});
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
                <TableHeader pickedEntity={pickedSpecialist.fullname} handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }} btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"specialist"} id={pickedSpecialist.specialist_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 await deleteSpecialist(pickedSpecialist.specialist_id);
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
                                 onClose={() => {
                                     setPickedSpecialist({} as Specialist)
                                     setJournalModalOpen(false)
                                 }}
                                 isShow={JournalModalOpen}
                                 picked={pickedSpecialist ?? undefined}
                             />}
                             deleteEntity={"специалиста"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={{ position: ["bottomCenter"], defaultPageSize: 25 }}
                    scroll={{ y: "58vh" }}
                    loading={isLoading}
                    dataSource={filteredData.map((el, index) => ({...el, key: index + 1}))}
                    summary={() => {
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell align={"center"} index={2}>Записей: {filteredData.length}</Table.Summary.Cell>
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





import {useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import type {ModalType} from "@typings/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, DatePicker, Flex, Form, Input, Popover, Table, Tooltip} from "antd";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import {FaFilter} from "react-icons/fa";
import type {ColumnType} from "antd/es/table";
import ConsultationsModal from "@pages/ConsultationsPage/ConsultationsModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {roleStore} from "@/store/store.ts";
import type {Consultation} from "@/types/types.ts";
import {
    useDeleteConsultation,
    useGetConsultationsByContractId
} from "@/services/api/consultations/consultations.ts";
import dayjs from "dayjs";
import type {Dayjs} from "dayjs";

const ConsultationsPage = () => {
    document.title = "Реестр консультаций";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {RangePicker} = DatePicker;
    const {role} = roleStore();
    const [pickedConsultation, setPickedConsultation] = useState<Consultation>({} as Consultation);
    const {data, isLoading, refetch} = useGetConsultationsByContractId(role?.contract_id);
    const {mutateAsync: deleteConsultation, isError: isDeleteError} = useDeleteConsultation();
    const [filters, setFilters] = useState<{
        date_cons?: [Dayjs, Dayjs] | null;
        content_cons?: string;
        result_cons?: string;
    }>({});
    const columns: ColumnType<Consultation & { key: number }>[] = [
        {
            width: 20,
            align: "center",
            title: '№',
            dataIndex: 'key',
            key: 'key',
        },
        {
            align: "center",
            title: 'Дата',
            dataIndex: 'date_cons',
            key: 'date_cons',
            render: (_: any, record) => {
                return (
                  <div>{dayjs(record.date_cons).format("DD.MM.YYYY")}</div>
                );
            }
        },
        {
            align: "center",
            title: 'Содержание обращения',
            dataIndex: 'content_cons',
            key: 'content_cons',
        },
        {
            align: "center",
            title: 'Результат рассмотрения',
            dataIndex: 'result_cons',
            key: 'result_cons',
        },
    ]

    const onRow = (record: Consultation & { key: number }) => {
        return {
            onChange: () => {
                setPickedConsultation(record);
            }
        };
    };

    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter((consultation) => {
            // Фильтр по дате
            if (filters.date_cons && filters.date_cons[0] && filters.date_cons[1]) {
                const consultationDate = dayjs(consultation.date_cons);
                const startDate = filters.date_cons[0].startOf('day');
                const endDate = filters.date_cons[1].endOf('day');
                if (consultationDate.isBefore(startDate) || consultationDate.isAfter(endDate)) {
                    return false;
                }
            }
            
            // Фильтр по содержанию обращения
            if (filters.content_cons && filters.content_cons.trim()) {
                const content = consultation.content_cons?.toLowerCase() || '';
                const filterValue = filters.content_cons.toLowerCase().trim();
                if (!content.includes(filterValue)) {
                    return false;
                }
            }
            
            // Фильтр по результату рассмотрения
            if (filters.result_cons && filters.result_cons.trim()) {
                const result = consultation.result_cons?.toLowerCase() || '';
                const filterValue = filters.result_cons.toLowerCase().trim();
                if (!result.includes(filterValue)) {
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
                    date_cons: values.date_cons || null,
                    content_cons: values.content_cons || undefined,
                    result_cons: values.result_cons || undefined,
                });
                setOpenFilter(false);
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"w-[400px]"}>
                    <Form.Item name={"date_cons"} label={"Дата"}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                    <Form.Item name={"content_cons"} label={"Содержание обращения"}>
                        <Input allowClear placeholder={"Содержание обращения"}/>
                    </Form.Item>
                    <Form.Item name={"result_cons"} label={"Результат рассмотрения"}>
                        <Input allowClear placeholder={"Результат рассмотрения"}/>
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
                <BackBtn onClick={() => navigate(routes.main)}/>
                <span className={"font-bold"}>Реестр консультаций</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader pickedEntity={pickedConsultation.content_cons} handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"consultation"}
                             id={pickedConsultation.consultation_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 if (!pickedConsultation.consultation_id) return;
                                 await deleteConsultation({id: pickedConsultation.consultation_id, contract_id: role.contract_id});
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
                             pickedRow={pickedConsultation ?? undefined}
                             setPickedRow={setPickedConsultation}
                             children={<ConsultationsModal
                                 type={modalType}
                                 onClose={() => {
                                     setPickedConsultation({} as Consultation)
                                     setJournalModalOpen(false)
                                 }}
                                 isShow={JournalModalOpen}
                             />}
                             deleteEntity={"реестр"}/>
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

export default ConsultationsPage;















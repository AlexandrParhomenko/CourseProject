import {useNavigate} from "react-router-dom";
import {useState, useMemo} from "react";
import {Button, DatePicker, Flex, Form, Input, Popover, Select, Table, Tooltip} from "antd";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import {PiKeyboardLight, PiMicrosoftExcelLogoFill} from "react-icons/pi";
import {useForm} from "antd/es/form/Form";
import {FaFilter} from "react-icons/fa";
import SupervisionJournalModal from "@pages/SupervisionJournalPage/SupervisionJournalModal.tsx";
import type {ColumnType} from "antd/es/table";
import type {ModalType, MainJournal} from "@/types/types.ts";
import {roleStore} from "@/store/store.ts";
import {
    useDeleteMainJournal,
    useGetMainJournalsByContractId
} from "@/services/api/main-journal/main-journal.ts";
import dayjs, {Dayjs} from "dayjs";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const SupervisionJournalPage = () => {
    document.title = "Электронный журнал авторского надзора";
    const {role} = roleStore();
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {RangePicker} = DatePicker;
    const [pickedMain, setPickedMain] = useState<MainJournal>({} as MainJournal);
    const [filters, setFilters] = useState<{
        contract_from?: [Dayjs | null, Dayjs | null] | null;
        object?: string;
        title?: string;
        brand?: string;
        section?: string;
        sub_section?: string;
        defects?: string;
        instructions?: string;
        importance?: string;
        specialist?: string;
        deadline?: string;
        elimination?: string;
        execution_date?: [Dayjs | null, Dayjs | null] | null;
    }>({});
    const {data, isLoading, refetch} = useGetMainJournalsByContractId(role?.contract_id);
    const {mutateAsync: deleteMainJournal, isError: isDeleteError} = useDeleteMainJournal();

    const columns: ColumnType<MainJournal & { key: number }>[] = [
        {
            width: 50,
            align: "center",
            title: "№",
            dataIndex: "key",
            key: "key"
        },
        {
            width: 150,
            align: "center",
            title: "Дата",
            dataIndex: "date_supervision",
            key: "date_supervision",
            render: (_: any, record) => {
                return (
                  <div>{dayjs(record.date_supervision).format("DD.MM.YYYY")}</div>
                );
            }
        },
        {
            align: "center",
            title: "Сокращенное наименование объекта",
            dataIndex: "abbreve_name_object",
            key: "abbreve_name_object",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.object.abbreve_name_object}</div>
                );
            }
        },
        {
            align: "center",
            title: "Объект",
            dataIndex: "number_object",
            key: "number_object",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.object.number_object}</div>
                );
            }
        },
        {
            align: "center",
            title: "Титул",
            dataIndex: "title",
            key: "title",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.title}</div>
                );
            }
        },
        {
            align: "center",
            title: "Дисциплина",
            dataIndex: "title",
            key: "title",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.discipline.discipline}</div>
                );
            }
        },
        {
            align: "center",
            title: "Марка РД",
            dataIndex: "name_brand",
            key: "name_brand",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.name_brand}</div>
                );
            }
        },
        {
            align: "center",
            title: "Секция",
            dataIndex: "sections",
            key: "sections",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.sections}</div>
                );
            }
        },
        {
            align: "center",
            title: "Подсекция",
            dataIndex: "subsection",
            key: "subsection",
            render: (_: any, record) => {
                return (
                  <div>{record.brand.subsection}</div>
                );
            }
        },
        {
            title: "Выявленные отступления / нарушения",
            dataIndex: "defects",
            key: "defects"
        },
        {
            title: "Указания об устранении выявленных отступлений или нарушений и сроки их выполнения, согласованные с заказчиком",
            dataIndex: "instructions",
            key: "instructions"
        },
        {
            align: "center",
            title: "Значимость отступления",
            dataIndex: "defect",
            key: "defect"
        },
        {
            align: "center",
            title: "Ф.И.О специалиста авторского надзора, выполнившего запись в журнале АН",
            dataIndex: "create_row_user",
            key: "create_row_user"
        },
        {
            align: "center",
            title: "Срок устранения отступлений, дефектов, нарушений",
            dataIndex: "deadline_eliminate",
            key: "deadline_eliminate"
        },
        {
            align: "center",
            title: "Отметка о выполнении указаний",
            dataIndex: "elimination",
            key: "elimination",
            render: (_: any, record) => {
                return (
                  <div>{record.elimination && "Устранено"}</div>
                )
            }
        },
        {
            align: "center",
            title: "Дата выполнения указаний",
            dataIndex: "updated_elimination_at_true",
            key: "updated_elimination_at_true",
            render: (_: any, record) => {
                return (
                  <div>{record.updated_elimination_at_true && dayjs(record.updated_elimination_at_true).format("DD.MM.YYYY")}</div>
                )
            }
        },
        {
            align: "center",
            title: "Гиперссылка на фото/чертеж авторского надзора",
            dataIndex: "path_to_drawing",
            key: "path_to_drawing"
        }
    ];

    const onRow = (record: MainJournal & { key: number }) => {
        return {
            onChange: () => {
                setPickedMain(record);
            },
            onDoubleClick: () => {
                setPickedMain(record);
                setModalType("update");
                setJournalModalOpen(true);
            }
        };
    };
    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter((record) => {
            // Фильтр по дате
            if (filters.contract_from && filters.contract_from[0] && filters.contract_from[1]) {
                const supervisionDate = dayjs(record.date_supervision);
                const startDate = filters.contract_from[0].startOf('day');
                const endDate = filters.contract_from[1].endOf('day');
                if (supervisionDate.isBefore(startDate) || supervisionDate.isAfter(endDate)) {
                    return false;
                }
            }
            
            // Фильтр по объекту
            if (filters.object) {
                const numberObject = record.brand?.object?.number_object || "";
                if (!numberObject.toLowerCase().includes(filters.object.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по титулу
            if (filters.title) {
                const title = record.brand?.title || "";
                if (!title.toLowerCase().includes(filters.title.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по марке
            if (filters.brand) {
                const nameBrand = record.brand?.name_brand || "";
                if (!nameBrand.toLowerCase().includes(filters.brand.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по секции
            if (filters.section) {
                const sections = record.brand?.sections || "";
                if (!sections.toLowerCase().includes(filters.section.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по подсекции
            if (filters.sub_section) {
                const subsection = record.brand?.subsection || "";
                if (!subsection.toLowerCase().includes(filters.sub_section.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по выявленным отступлениям
            if (filters.defects) {
                const defects = record.defects || "";
                if (!defects.toLowerCase().includes(filters.defects.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по указаниям об устранении
            if (filters.instructions) {
                const instructions = record.instructions || "";
                if (!instructions.toLowerCase().includes(filters.instructions.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по значимости отступления
            if (filters.importance) {
                const importance = record.defects || "";
                if (!importance.toLowerCase().includes(filters.importance.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по ФИО специалиста
            if (filters.specialist) {
                const fullname = record.create_row_user?.fullname || "";
                if (!fullname.toLowerCase().includes(filters.specialist.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по сроку устранения
            if (filters.deadline) {
                const deadline = record.deadline_eliminate || "";
                if (!deadline.toLowerCase().includes(filters.deadline.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по отметке о выполнении
            if (filters.elimination !== undefined && filters.elimination !== null && filters.elimination !== "") {
                const eliminationValue = filters.elimination === "true" || filters.elimination === "Устранено";
                if (record.elimination !== eliminationValue) {
                    return false;
                }
            }
            
            // Фильтр по дате выполнения указаний
            if (filters.execution_date && filters.execution_date[0] && filters.execution_date[1]) {
                if (!record.updated_elimination_at_true) {
                    return false;
                }
                const executionDate = dayjs(record.updated_elimination_at_true);
                const startDate = filters.execution_date[0].startOf('day');
                const endDate = filters.execution_date[1].endOf('day');
                if (executionDate.isBefore(startDate) || executionDate.isAfter(endDate)) {
                    return false;
                }
            }
            
            return true;
        });
    }, [data, filters]);

    const filterOps = (
        <div className={"w-[450px] p-2"}>
            <Form form={form} scrollToFirstError={{
                behavior: "smooth",
                block: "center",
                inline: "center"
            }} onFinish={(values) => {
                setFilters({
                    contract_from: values.contract_from || undefined,
                    object: values.object || undefined,
                    title: values.title || undefined,
                    brand: values.brand || undefined,
                    section: values.section || undefined,
                    sub_section: values.sub_section || undefined,
                    defects: values.defects || undefined,
                    instructions: values.instructions || undefined,
                    importance: values.importance || undefined,
                    specialist: values.specialist || undefined,
                    deadline: values.deadline || undefined,
                    elimination: values.elimination || undefined,
                    execution_date: values.execution_date || undefined,
                });
                setOpenFilter(false);
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"h-96 overflow-y-auto"}>
                    <Form.Item name={"contract_from"} label={"Дата"}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                    <div className={"flex flex-wrap justify-between"}>
                        <Form.Item style={{width: "49%"}} name={"object"} label={"Объект"}>
                            <Input allowClear placeholder={"Объект"}/>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"title"} label={"Титул"}>
                            <Input allowClear placeholder={"Титул"}/>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"brand"} label={"Марка"}>
                            <Input allowClear placeholder={"Марка"}/>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"section"} label={"Секция"}>
                            <Input allowClear placeholder={"Секция"}/>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"sub_section"} label={"Подсекции"}>
                            <Input allowClear placeholder={"Подсекции"}/>
                        </Form.Item>
                    </div>
                    <Form.Item name={"defects"} label={"Выявленные отступления"}>
                        <Input allowClear placeholder={"Выявленные отступления"}/>
                    </Form.Item>
                    <Form.Item name={"instructions"} label={"Указания об устранении"}>
                        <Input allowClear placeholder={"Указания об устранении"}/>
                    </Form.Item>
                    <Form.Item name={"importance"} label={"Значимость отступления, нарушения"}>
                        <Input allowClear placeholder={"Значимость отступления, нарушения"}/>
                    </Form.Item>
                    <Form.Item name={"specialist"} label={"ФИО специалиста АН"}>
                        <Input allowClear placeholder={"ФИО специалиста АН"}/>
                    </Form.Item>
                    <Form.Item name={"deadline"} label={"Срок устранения"}>
                        <Input allowClear placeholder={"Срок устранения"}/>
                    </Form.Item>
                    <Form.Item name={"elimination"} label={"Отметка о выполнении"}>
                        <Select allowClear placeholder={"Отметка о выполнении"}>
                            <Select.Option value={"true"}>Устранено</Select.Option>
                            <Select.Option value={"false"}>Не устранено</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"execution_date"} label={"Выполнение указаний"}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
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
                <span className={"font-bold"}>Электронный журнал авторского надзора за строительством объекта(ов) по договору {role ? role.contract.number_contract : "-"}</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }} pickedEntity={`id ${pickedMain.main_journal_id}`}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"main-journal"}
                             id={pickedMain.main_journal_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 if (!pickedMain.main_journal_id) return;
                                 await deleteMainJournal({main_journal_id: pickedMain.main_journal_id, contract_id: role.contract_id});
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
                             pickedRow={pickedMain ?? undefined}
                             setPickedRow={setPickedMain}
                             actionsElems={<>
                                 <Tooltip
                                     placement={"bottom"} title={"Выгрузка в Excel"}>
                                     <div onClick={() => {
                                     }}
                                          className={"flex items-center  cursor-pointer delay-300 p-2 rounded-md hover:bg-gray-50"}>
                                         <PiMicrosoftExcelLogoFill size={25} color={"#1D6F42"}/>
                                     </div>
                                 </Tooltip>
                                 <Tooltip
                                     placement={"bottom"} title={"Открыть дашборд"}>
                                     <div onClick={() => {
                                     }}
                                          className={"flex items-center cursor-pointer delay-300 p-2 rounded-md hover:bg-gray-50"}>
                                         <PiKeyboardLight size={25} color={"#3f3f3f"}/>
                                     </div>
                                 </Tooltip>
                             </>}
                             children={
                                 <SupervisionJournalModal
                                     type={modalType}
                                     onClose={() => {
                                         setJournalModalOpen(false)
                                         setPickedMain({} as MainJournal)
                                     }}
                                     isShow={JournalModalOpen}
                                     picked={pickedMain ?? undefined}
                                 />
                             }
                             deleteEntity={"элемент журнала"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={{ position: ["bottomCenter"], defaultPageSize: 25 }}
                    loading={isLoading}
                    dataSource={filteredData && filteredData.map((el, index) => ({...el, key: index + 1}))}
                    scroll={{x: 4000}}
                    summary={() => {
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell align={"center"} index={2}>Записей: {filteredData ? filteredData.length : 0}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default SupervisionJournalPage;
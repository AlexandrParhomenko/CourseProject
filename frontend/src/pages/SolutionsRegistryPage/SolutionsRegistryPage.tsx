import {useNavigate} from "react-router-dom";
import {useState, useMemo} from "react";
import type {ModalType} from "@typings/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, DatePicker, Flex, Form, Input, Popover, Table, Tooltip} from "antd";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import {FaFilter} from "react-icons/fa";
import type {ColumnType} from "antd/es/table";
import SolutionsRegistryModal from "@pages/SolutionsRegistryPage/SolutionsRegistryModal.tsx";
import {roleStore} from "@/store/store.ts";
import type {TechnicalRegistry} from "@/types/types.ts";
import {
    useDeleteTechnicalRegistry,
    useGetTechnicalRegistriesByContractId
} from "@/services/api/register-technical-solutions/register-technical-solutions.ts";
import dayjs, {Dayjs} from "dayjs";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";

const SolutionsRegistryPage = () => {
    document.title = "Реестр технических решений";
    const {role} = roleStore();
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {RangePicker} = DatePicker;
    const [pickedTechnical, setPickedTechnical] = useState<TechnicalRegistry>({} as TechnicalRegistry);
    const [filters, setFilters] = useState<{
        journal_date?: [Dayjs | null, Dayjs | null] | null;
        journal_content?: string;
        rd_marking?: string;
        change_reason?: string;
        rd_status?: string;
    }>({});

    const {data, isLoading, refetch} = useGetTechnicalRegistriesByContractId(role?.contract_id);
    const {mutateAsync: deleteTechnical, isError: isDeleteError} = useDeleteTechnicalRegistry();

    const columns: ColumnType<TechnicalRegistry & { key: number }>[] = [
        {
            width: 20,
            align: "center",
            title: '№',
            dataIndex: 'key',
            key: 'key',
        },
        {
            align: "center",
            title: 'Краткое содержание в ЖАНе',
            dataIndex: 'reason_change',
            key: 'reason_change',
        },
        {
            align: "center",
            title: 'Дата записи в ЖАНе',
            dataIndex: 'date_solution',
            key: 'date_solution',
            render: (_: any, record) => {
                return (
                  <div>{dayjs(record.date_solution).format("DD.MM.YYYY")}</div>
                )
            }
        },
        {
            align: "center",
            title: 'РД (шифр марки)',
            dataIndex: 'full_brand_code',
            key: 'full_brand_code',
        },
        {
            align: "center",
            title: 'Причина изменения',
            dataIndex: 'reason_change',
            key: 'reason_change',
        },
        {
            align: "center",
            title: 'Гиперссылка на запись в ЖАНе/дефектную ведомость (Фото)',
            dataIndex: 'path_photo_sol',
            key: 'path_photo_sol',
        },
        {
            align: "center",
            title: 'Статус внесения в РД',
            dataIndex: 'status_compliance',
            key: 'status_compliance',
        },
        {
            align: "center",
            title: 'Примечание',
            dataIndex: 'note',
            key: 'note',
        },
    ]

    const onRow = (record: TechnicalRegistry & { key: number }) => {
        return {
            onChange: () => {
                setPickedTechnical(record);
            },
            onDoubleClick: () => {
                setPickedTechnical(record);
                setModalType("update")
                setJournalModalOpen(true)
            }
        };
    };

    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter((record) => {
            // Фильтр по дате записи в ЖАНе
            if (filters.journal_date && filters.journal_date[0] && filters.journal_date[1]) {
                const solutionDate = dayjs(record.date_solution);
                const startDate = filters.journal_date[0].startOf('day');
                const endDate = filters.journal_date[1].endOf('day');
                if (solutionDate.isBefore(startDate) || solutionDate.isAfter(endDate)) {
                    return false;
                }
            }
            
            // Фильтр по краткому содержанию в ЖАНе (reason_change)
            if (filters.journal_content) {
                const reasonChange = record.reason_change || "";
                if (!reasonChange.toLowerCase().includes(filters.journal_content.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по РД (шифр марки)
            if (filters.rd_marking) {
                const fullBrandCode = record.full_brand_code || "";
                if (!fullBrandCode.toLowerCase().includes(filters.rd_marking.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по причине изменения (reason_change)
            if (filters.change_reason) {
                const reasonChange = record.reason_change || "";
                if (!reasonChange.toLowerCase().includes(filters.change_reason.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по статусу внесения в РД
            if (filters.rd_status) {
                const statusCompliance = record.status_compliance || "";
                if (!statusCompliance.toLowerCase().includes(filters.rd_status.toLowerCase())) {
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
                    journal_date: values.journal_date || undefined,
                    journal_content: values.journal_content || undefined,
                    rd_marking: values.rd_marking || undefined,
                    change_reason: values.change_reason || undefined,
                    rd_status: values.rd_status || undefined,
                });
                setOpenFilter(false);
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"w-[400px]"}>
                    <Form.Item name={"journal_date"} label={"Дата записи в ЖАНе"}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                    <Form.Item name={"journal_content"} label={"Краткое содержание в ЖАНе"}>
                        <Input allowClear placeholder={"Краткое содержание в ЖАНе"}/>
                    </Form.Item>
                    <Form.Item name={"rd_marking"} label={"РД (шифр марки)"}>
                        <Input allowClear placeholder={"РД (шифр марки)"}/>
                    </Form.Item>
                    <Form.Item name={"change_reason"} label={"Причина"}>
                        <Input allowClear placeholder={"Причина"}/>
                    </Form.Item>
                    <Form.Item name={"rd_status"} label={"Статус внесения в РД"}>
                        <Input allowClear placeholder={"Статус внесения в РД"}/>
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
                <span className={"font-bold"}>Реестр технических решений по договору {role ? role.contract.number_contract : "-"}</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }} pickedEntity={pickedTechnical.reason_change}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"technical-registry"}
                             id={pickedTechnical.registry_technical_solution_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 if (!pickedTechnical.registry_technical_solution_id) return;
                                 await deleteTechnical({
                                     registry_technical_solutions: pickedTechnical.registry_technical_solution_id,
                                     contract_id: role.contract_id
                                 });
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
                             pickedRow={pickedTechnical ?? undefined}
                             setPickedRow={setPickedTechnical}
                             children={<SolutionsRegistryModal
                                 type={modalType}
                                 onClose={() => {
                                     setJournalModalOpen(false)
                                     setPickedTechnical({} as TechnicalRegistry)
                                 }}
                                 isShow={JournalModalOpen}
                                 picked={pickedTechnical ?? undefined}
                             />}
                             deleteEntity={"решение"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={{ position: ["bottomCenter"], defaultPageSize: 25 }}
                    loading={isLoading}
                    dataSource={filteredData && filteredData.map((el, index) => ({...el, key: index + 1}))}
                    scroll={{x: 2500}}
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

export default SolutionsRegistryPage;



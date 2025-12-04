import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ModalType} from "@typings/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, DatePicker, Flex, Form, Input, Popover, Select, Table, Tooltip} from "antd";
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
import dayjs from "dayjs";

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
                    <Form.Item name={"journal_date"} label={"Дата записи в ЖАНе"}>
                        <RangePicker className={"w-full"}/>
                    </Form.Item>
                    <Form.Item name={"journal_content"} label={"Краткое содержание в ЖАНе"}>
                        <Input allowClear placeholder={"Краткое содержание в ЖАНе"}/>
                    </Form.Item>
                    <Form.Item name={"rd_marking"} label={"РД (шифр марки)"}>
                        <Select allowClear placeholder={"РД (шифр марки)"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"change_reason"} label={"Причина"}>
                        <Input allowClear placeholder={"Причина"}/>
                    </Form.Item>
                    <Form.Item name={"rd_status"} label={"Статус внесения в РД"}>
                        <Select allowClear placeholder={"Статус внесения в РД"}>
                        </Select>
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
                <BackBtn onClick={() => navigate(routes.main)}/>
                <span className={"font-bold"}>Реестр технических решений по договору {role ? role.contract.number_contract : "-"}</span>
                <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
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
                                 onClose={() => setJournalModalOpen(false)}
                                 isShow={JournalModalOpen}
                                 picked={pickedTechnical ?? undefined}
                             />}
                             deleteEntity={"решение"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    loading={isLoading}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
                    scroll={{x: 2500}}
                    summary={() => {
                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell align={"center"} index={2}>Записей: {data ? data.length : 0}</Table.Summary.Cell>
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



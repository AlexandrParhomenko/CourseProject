import {useNavigate} from "react-router-dom";
import {useState} from "react";
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
import dayjs from "dayjs";

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
            title: "Выявленные отступления / нарушения",
            dataIndex: "defects",
            key: "defects"
        },
        {
            title: "Указания об устранении",
            dataIndex: "instructions",
            key: "instructions"
        },
        {
            align: "center",
            title: "Значимость отступления",
            dataIndex: "importance_defect_id",
            key: "importance_defect_id"
        }
    ];

    const onRow = (record: MainJournal & { key: number }) => {
        return {
            onChange: () => {
                setPickedMain(record);
            },
            onDoubleClick: () => {
                setModalType("update");
                setJournalModalOpen(true);
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
                <div className={"h-96 overflow-y-auto"}>
                    <Form.Item name={"contract_from"} label={"Дата"}>
                        <RangePicker/>
                    </Form.Item>
                    <div className={"flex flex-wrap justify-between"}>
                        <Form.Item style={{width: "49%"}} name={"object"} label={"Объект"}>
                            <Select allowClear placeholder={"Объект"}>
                                <Select.Option value={"29-36"}>29-36</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"title"} label={"Титул"}>
                            <Select allowClear placeholder={"Титул"}>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"brand"} label={"Марка"}>
                            <Select allowClear placeholder={"Марка"}>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"section"} label={"Секция"}>
                            <Select allowClear placeholder={"Секция"}>
                            </Select>
                        </Form.Item>
                        <Form.Item style={{width: "49%"}} name={"sub_section"} label={"Подсекции"}>
                            <Select allowClear placeholder={"Подсекции"}>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item name={"include_himself"} label={"Выявленные отступления"}>
                        <Input allowClear placeholder={"Выявленные отступления"}/>
                    </Form.Item>
                    <Form.Item name={"include_himself"} label={"Указания об устранении"}>
                        <Input allowClear placeholder={"Указания об устранении"}/>
                    </Form.Item>
                    <Form.Item name={"include_himself"} label={"Значимость отступления, нарушения"}>
                        <Select allowClear placeholder={"Значимость отступления, нарушения"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"include_himself"} label={"ФИО специалиста АН"}>
                        <Select allowClear placeholder={"ФИО специалиста АН"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"include_himself"} label={"Срок устранения"}>
                        <Input allowClear placeholder={"Срок устранения"}/>
                    </Form.Item>
                    <Form.Item name={"include_himself"} label={"Организация, ответственная за устранение"}>
                        <Select allowClear placeholder={"Организация, ответственная за устранение"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"include_himself"} label={"Отметка о выполнении"}>
                        <Select allowClear placeholder={"Отметка о выполнении"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"contract_from"} label={"Выполнение указаний"}>
                        <RangePicker/>
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
                <span className={"font-bold"}>Электронный журнал авторского надзора за строительством объекта(ов) по договору {role ? role.contract.number_contract : "-"}</span>
                <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
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
                                     onClose={() => setJournalModalOpen(false)}
                                     isShow={JournalModalOpen}
                                     picked={pickedMain ?? undefined}
                                 />
                             }
                             deleteEntity={"элемент журнала"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    loading={isLoading}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
                    scroll={{x: 3000}}
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

export default SupervisionJournalPage;
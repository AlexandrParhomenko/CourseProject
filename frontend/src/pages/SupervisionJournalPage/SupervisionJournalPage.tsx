import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, DatePicker, Flex, Form, Input, Popover, Select, Table, Tooltip} from "antd";
import {supervisionJournalColumns} from "@/constants/table_columns/table_columns.tsx";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import {PiKeyboardLight, PiMicrosoftExcelLogoFill} from "react-icons/pi";
import {useForm} from "antd/es/form/Form";
import {FaFilter} from "react-icons/fa";
import SupervisionJournalModal from "@pages/SupervisionJournalPage/SupervisionJournalModal.tsx";
import type {ModalType} from "@/types/types.ts";

const SupervisionJournalPage = () => {
    document.title = "Электронный журнал авторского надзора";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm()
    const {RangePicker} = DatePicker;
    const object = Form.useWatch("object", form);
    const title = Form.useWatch("title", form);
    const brand = Form.useWatch("brand", form);
    const section = Form.useWatch("section", form);
    const sub_section = Form.useWatch("sub_section", form);

    const onRow = (record: any) => {
        return {
            onChange: () => {
                console.log(record)
            },
            onDoubleClick: () => {
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
                <span className={"font-bold"}>Электронный журнал авторского надзора за строительством объекта(ов) по договору number_contract</span>
                <span className={"font-bold duration-300 cursor-pointer hover:text-yellow-400"}>Выйти</span>
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
                             children={<SupervisionJournalModal type={modalType} onClose={() => setJournalModalOpen(false)}
                                                                isShow={JournalModalOpen}/>}
                             deleteEntity={"объект"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    dataSource={[]}
                    scroll={{x: 4000}}
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
                    columns={supervisionJournalColumns}/>
            </div>
        </Flex>
    );
};

export default SupervisionJournalPage;
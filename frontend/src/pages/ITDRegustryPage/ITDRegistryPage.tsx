import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ModalType} from "@/types/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, DatePicker, Flex, Form, Input, Popover, Select, Table, Tooltip} from "antd";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import {FaFilter} from "react-icons/fa";
import {itdRegistry} from "@/constants/table_columns/table_columns.tsx";
import IDTRegistryModal from "@pages/ITDRegustryPage/IDTRegistryModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {roleStore} from "@/store/store.ts";

const ItdRegistryPage = () => {
    const {role} = roleStore();
    document.title = `Реестр подписанной ИТД в рамках АН по договору ${role ? role.contract.number_contract : "-"}`;
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm()
    const {RangePicker} = DatePicker;

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
                    <Form.Item name={"object"} label={"Марка РД"}>
                        <Select allowClear placeholder={"Марка РД"}>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"title"} label={"Вид работ"}>
                        <Input allowClear placeholder={"Вид работ"}/>
                    </Form.Item>
                    <Form.Item name={"brand"} label={"Передача на рассмотрение в ПАО \"ОНХП\""}>
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item name={"section"} label={"Подписание документа представителем АН \"ОНХП\""}>
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
                <span className={"font-bold"}>Реестр подписанной ИТД в рамках АН по договору {role ? role.contract.number_contract : "-"}</span>
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
                             children={<IDTRegistryModal type={modalType}
                                                                onClose={() => setJournalModalOpen(false)}
                                                                isShow={JournalModalOpen}/>}
                             deleteEntity={"объект"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    dataSource={[]}
                    scroll={{x: 2500}}
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
                    columns={itdRegistry}/>
            </div>
        </Flex>
    );
};

export default ItdRegistryPage;
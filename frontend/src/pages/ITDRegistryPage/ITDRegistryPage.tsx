import {useNavigate} from "react-router-dom";
import {useState, useMemo} from "react";
import type {ModalType} from "@/types/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, DatePicker, Flex, Form, Input, Popover, Select, Table, Tooltip} from "antd";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import {FaFilter} from "react-icons/fa";
import {itdRegistry} from "@/constants/table_columns/table_columns.tsx";
import IDTRegistryModal from "@pages/ITDRegistryPage/IDTRegistryModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {roleStore} from "@/store/store.ts";
import {useDeleteRegistry, useGetRegistriesByContractId} from "@/services/api/registry/registry.ts";
import type {Registry} from "@/types/types.ts";
import {useGetBrandsByContractId} from "@/services/api/brands/brands.ts";
import dayjs, {Dayjs} from "dayjs";

const ItdRegistryPage = () => {
    const {role} = roleStore();
    document.title = `Реестр подписанной ИТД в рамках АН по договору ${role ? role.contract.number_contract : "-"}`;
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {RangePicker} = DatePicker;
    const [pickedRegistry, setPickedRegistry] = useState<Registry>({} as Registry);
    const [filters, setFilters] = useState<{
        object?: number;
        title?: string;
        brand?: [Dayjs | null, Dayjs | null] | null;
        section?: [Dayjs | null, Dayjs | null] | null;
    }>({});
    const {data, isLoading, refetch} = useGetRegistriesByContractId(role?.contract_id);
    const {mutateAsync: deleteRegistry, isError: isDeleteError} = useDeleteRegistry();
    const {data: brands} = useGetBrandsByContractId(role?.contract_id);
    const onRow = (record: Registry & { key: number }) => {
        return {
            onChange: () => {
                setPickedRegistry(record);
            },
            onDoubleClick: () => {
                setPickedRegistry(record);
                setModalType("update")
                setJournalModalOpen(true)
            }
        };
    };
    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter((record) => {
            // Фильтр по марке РД (brand_id)
            if (filters.object) {
                if (record.brand_id !== filters.object) {
                    return false;
                }
            }
            
            // Фильтр по виду работ (type_work)
            if (filters.title) {
                const typeWork = record.type_work || "";
                if (!typeWork.toLowerCase().includes(filters.title.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по дате передачи на рассмотрение (date_of_review)
            if (filters.brand && filters.brand[0] && filters.brand[1]) {
                if (!record.date_of_review) {
                    return false;
                }
                const reviewDate = dayjs(record.date_of_review);
                const startDate = filters.brand[0].startOf('day');
                const endDate = filters.brand[1].endOf('day');
                if (reviewDate.isBefore(startDate) || reviewDate.isAfter(endDate)) {
                    return false;
                }
            }
            
            // Фильтр по дате подписания документа (date_signing_doc)
            if (filters.section && filters.section[0] && filters.section[1]) {
                if (!record.date_signing_doc) {
                    return false;
                }
                const signingDate = dayjs(record.date_signing_doc);
                const startDate = filters.section[0].startOf('day');
                const endDate = filters.section[1].endOf('day');
                if (signingDate.isBefore(startDate) || signingDate.isAfter(endDate)) {
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
                    object: values.object || undefined,
                    title: values.title || undefined,
                    brand: values.brand || undefined,
                    section: values.section || undefined,
                });
                setOpenFilter(false);
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"w-[400px]"}>
                    <Form.Item name={"object"} label={"Марка РД"}>
                        <Select allowClear placeholder={"Марка РД"}>
                          {brands && brands.map((el, idx) => <Select.Option key={idx} value={el.brand_id}>{el.name_brand}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name={"title"} label={"Вид работ"}>
                        <Input allowClear placeholder={"Вид работ"}/>
                    </Form.Item>
                    <Form.Item name={"brand"} label={"Передача на рассмотрение в ПАО \"ОНХП\""}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                    <Form.Item name={"section"} label={"Подписание документа представителем АН \"ОНХП\""}>
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
                <span className={"font-bold"}>Реестр подписанной ИТД в рамках АН по договору {role ? role.contract.number_contract : "-"}</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }} pickedEntity={`id ${pickedRegistry.registry_id}`}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"registry"}
                             id={pickedRegistry.registry_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 if (!pickedRegistry.registry_id) return;
                                 await deleteRegistry({registry_id: pickedRegistry.registry_id, contract_id: role.contract_id});
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
                             pickedRow={pickedRegistry ?? undefined}
                             setPickedRow={setPickedRegistry}
                             children={<IDTRegistryModal
                                 type={modalType}
                                 onClose={() => {
                                   setJournalModalOpen(false)
                                   setPickedRegistry({} as Registry)
                                 }}
                                 isShow={JournalModalOpen}
                                 picked={pickedRegistry ?? undefined}
                             />}
                             deleteEntity={"сущность"}/>
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
                    columns={itdRegistry}/>
            </div>
        </Flex>
    );
};

export default ItdRegistryPage;
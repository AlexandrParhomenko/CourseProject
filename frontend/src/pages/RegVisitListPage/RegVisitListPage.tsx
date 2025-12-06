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
import RegVisitListModal from "@pages/RegVisitListPage/RegVisitListModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {roleStore} from "@/store/store.ts";
import type {VisitSheet} from "@/types/types.ts";
import {
    useDeleteVisitSheet,
    useGetVisitSheetsByContractId
} from "@/services/api/visit-sheets/visit-sheets.ts";
import dayjs, {Dayjs} from "dayjs";

const RegVisitListPage = () => {
    document.title = "Регистрационный лист посещения объекта";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {RangePicker} = DatePicker;
    const {role} = roleStore();
    const [pickedVisit, setPickedVisit] = useState<VisitSheet>({} as VisitSheet);
    const [filters, setFilters] = useState<{
        fio?: string;
        arrival_date?: [Dayjs | null, Dayjs | null] | null;
        departure_date?: [Dayjs | null, Dayjs | null] | null;
    }>({});
    const {data, isLoading, refetch} = useGetVisitSheetsByContractId(role?.contract_id);
    const {mutateAsync: deleteVisitSheet, isError: isDeleteError} = useDeleteVisitSheet();
    const columns: ColumnType<VisitSheet & { key: number }>[] = [
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
            dataIndex: 'specialist',
            key: 'specialist',
            render: (_, record) => record.specialist?.fullname,
        },
        {
            align: "center",
            title: 'Дата приезда',
            dataIndex: 'date_arrival',
            key: 'date_arrival',
            render: (_: any, record) => {
                return (
                  <div>{dayjs(record.date_arrival).format("DD.MM.YYYY")}</div>
                )
            }
        },
        {
            align: "center",
            title: 'Дата отъезда',
            dataIndex: 'date_departure',
            key: 'date_departure',
            render: (_: any, record) => {
                return (
                  <div>{dayjs(record.date_departure).format("DD.MM.YYYY")}</div>
                )
            }
        },
        {
            title: 'Контактирующие лица',
            dataIndex: 'contact_persons',
            key: 'contact_persons',
            render: (_: any, record) => {
                return (
                  <div>{record.visit_sheet_ocps?.map(el => el.organization_contact_person.fullname).join(", ") || ""}</div>
                )
            }
        },
    ]

    const onRow = (record: VisitSheet & { key: number }) => {
        return {
            onChange: () => {
                setPickedVisit(record);
            },
            onDoubleClick: () => {
                setPickedVisit(record)
                setModalType("update")
                setJournalModalOpen(true)
            }
        };
    };

    const filteredData = useMemo(() => {
        if (!data) return [];
        
        return data.filter((record) => {
            // Фильтр по ФИО
            if (filters.fio) {
                const fullname = record.specialist?.fullname || "";
                if (!fullname.toLowerCase().includes(filters.fio.toLowerCase())) {
                    return false;
                }
            }
            
            // Фильтр по дате приезда
            if (filters.arrival_date && filters.arrival_date[0] && filters.arrival_date[1]) {
                const arrivalDate = dayjs(record.date_arrival);
                const startDate = filters.arrival_date[0].startOf('day');
                const endDate = filters.arrival_date[1].endOf('day');
                if (arrivalDate.isBefore(startDate) || arrivalDate.isAfter(endDate)) {
                    return false;
                }
            }
            
            // Фильтр по дате отъезда
            if (filters.departure_date && filters.departure_date[0] && filters.departure_date[1]) {
                const departureDate = dayjs(record.date_departure);
                const startDate = filters.departure_date[0].startOf('day');
                const endDate = filters.departure_date[1].endOf('day');
                if (departureDate.isBefore(startDate) || departureDate.isAfter(endDate)) {
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
                    arrival_date: values.arrival_date || undefined,
                    departure_date: values.departure_date || undefined,
                });
                setOpenFilter(false);
            }} layout="vertical" className="flex items-center flex-col gap-1">
                <div className={"w-[400px]"}>
                    <Form.Item name={"fio"} label={"ФИО"}>
                        <Input allowClear placeholder={"ФИО"}/>
                    </Form.Item>
                    <Form.Item name={"arrival_date"} label={"Дата приезда"}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                    <Form.Item name={"departure_date"} label={"Дата отъезда"}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button htmlType="button" type={"link"} className={"mr-2"} onClick={() => {
                        setPickedVisit({} as VisitSheet)
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
                <span className={"font-bold"}>Регистрационный лист посещения объекта</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }} pickedEntity={dayjs(pickedVisit.date_arrival).format("DD.MM.YYYY")}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"visit-sheet-organization-contact-person"}
                             id={pickedVisit.visit_sheet_id}
                             deleteFunc={async () => {
                                 if (!role?.contract_id) return;
                                 if (!pickedVisit.visit_sheet_id) return;
                                 await deleteVisitSheet({id: pickedVisit.visit_sheet_id, contract_id: role.contract_id});
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
                             pickedRow={pickedVisit ?? undefined}
                             setPickedRow={setPickedVisit}
                             children={<RegVisitListModal
                                 type={modalType}
                                 onClose={() => {
                                     setPickedVisit({} as VisitSheet)
                                     setJournalModalOpen(false)
                                 }}
                                 isShow={JournalModalOpen}
                                 picked={pickedVisit ?? undefined}
                             />}
                             deleteEntity={"лист посещения от"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={{ position: ["bottomCenter"], defaultPageSize: 25 }}
                    scroll={{ y: "58vh" }}
                    loading={isLoading}
                    dataSource={filteredData && filteredData.map((el, index) => ({...el, key: index + 1}))}
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

export default RegVisitListPage;












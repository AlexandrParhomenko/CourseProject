import {useNavigate} from "react-router-dom";
import {useState} from "react";
import type {ModalType} from "@typings/types.ts";
import {useForm} from "antd/es/form/Form";
import {Button, Flex, Form, Input, Popover, Table, Tooltip} from "antd";
import BackBtn from "@components/BackBtn/BackBtn.tsx";
import routes from "@router/routes.ts";
import TableHeader from "@components/TableHeader/TableHeader.tsx";
import {FaFilter} from "react-icons/fa";
import type {ColumnType} from "antd/es/table";
import OrganisationsModal from "@pages/OrganisationsPage/OrganisationsModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {roleStore} from "@/store/store.ts";
import type {OrganizationContact} from "@/types/types.ts";
import {
    useDeleteOrganizationContact,
    useGetOrganizationContactsByContractId
} from "@/services/api/organization-contact-person/organization-contact-person.ts";

const OrganisationsPage = () => {
    document.title = "Реестр организаций";
    const navigate = useNavigate();
    const [JournalModalOpen, setJournalModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>("create");
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    const [form] = useForm();
    const {role} = roleStore();
    const [pickedContact, setPickedContact] = useState<OrganizationContact | null>(null);

    const {data, isLoading, refetch} = useGetOrganizationContactsByContractId(role?.contract_id);
    const {mutateAsync: deleteOrganizationContact, isError: isDeleteError} = useDeleteOrganizationContact();

    const columns: ColumnType<OrganizationContact & { key: number }>[] = [
        {
            width: 20,
            align: "center",
            title: '№',
            dataIndex: 'key',
            key: 'key',
        },
        {
            align: "center",
            title: 'Участники проекта',
            dataIndex: 'project_participants',
            key: 'project_participants',
        },
        {
            align: "center",
            title: 'Организация',
            dataIndex: 'organization_id',
            key: 'organization_id',
        },
        {
            align: "center",
            title: 'ФИО контактного лица',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            align: "center",
            title: 'Должность',
            dataIndex: 'post',
            key: 'post',
        },
        {
            align: "center",
            title: 'Подразделение',
            dataIndex: 'department',
            key: 'department',
        },
        {
            align: "center",
            title: 'Контактный номер',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
    ]

    const onRow = (record: OrganizationContact & { key: number }) => {
        return {
            onClick: () => {
                setPickedContact(record);
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
                    <Form.Item name={"project_participant"} label={"Участники проекта"}>
                        <Input allowClear placeholder={"Участники проекта"}/>
                    </Form.Item>
                    <Form.Item name={"organisation"} label={"Организация"}>
                        <Input allowClear placeholder={"Организация"}/>
                    </Form.Item>
                    <Form.Item name={"contact_fio"} label={"ФИО контактного лица"}>
                        <Input allowClear placeholder={"ФИО контактного лица"}/>
                    </Form.Item>
                    <Form.Item name={"position"} label={"Должность"}>
                        <Input allowClear placeholder={"Должность"}/>
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
                <BackBtn onClick={() => navigate(routes.object_workers_list)}/>
                <span className={"font-bold"}>Реестр организаций</span>
                <ExitBtn/>
            </div>
            <div className={"w-full p-6"}>
                <TableHeader handleModalOpen={() => {
                    setModalType("create")
                    setJournalModalOpen(true)
                }}
                             btnName={"Новая запись"}
                             refetch={() => refetch()}
                             pickedPerson={"organization-contact-person"}
                             id={{id: pickedContact?.organization_contact_person_id}}
                             deleteFunc={async ({id}: {id: number}) => {
                                 if (!role?.contract_id) return;
                                 await deleteOrganizationContact({
                                     organization_contact_person_id: id,
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
                             pickedRow={pickedContact ?? undefined}
                             setPickedRow={setPickedContact}
                             children={<OrganisationsModal
                                 type={modalType}
                                 onClose={() => setJournalModalOpen(false)}
                                 isShow={JournalModalOpen}
                                 picked={pickedContact ?? undefined}
                             />}
                             deleteEntity={"объект"}/>
                <Table
                    rowSelection={{type: "radio"}}
                    onRow={(record) => onRow(record)}
                    pagination={false}
                    loading={isLoading}
                    dataSource={data && data.map((el, index) => ({...el, key: index + 1}))}
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
                    columns={columns}/>
            </div>
        </Flex>
    );
};

export default OrganisationsPage;















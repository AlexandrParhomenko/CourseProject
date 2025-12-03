import {Button, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore} from "@/store/store.ts";
import {
    useCreateOrganizationContact,
    useUpdateOrganizationContact
} from "@/services/api/organization-contact-person/organization-contact-person.ts";
import type {OrganizationContact} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: OrganizationContact
}

const OrganisationsModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<OrganizationContact>();
    const {role} = roleStore();
    const {mutateAsync: createContact} = useCreateOrganizationContact();
    const {mutateAsync: updateContact} = useUpdateOrganizationContact();

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<OrganizationContact>) => {
        if (!role?.contract_id) return;

        const payload: Partial<OrganizationContact> = {
            contract_id: role.contract_id,
            project_participants: values.project_participants ?? "",
            fullname: values.fullname ?? "",
            post: values.post ?? "",
            department: values.department ?? "",
            phone_number: values.phone_number ?? "",
        };

        if (isUpdate && picked) {
            await updateContact({
                organization_contact_person_id: picked.organization_contact_person_id,
                data: payload
            });
        } else {
            await createContact(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра организаций</span>
                <Form
                    form={form}
                    initialValues={picked}
                    scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }}
                    className={"flex items-center flex-col w-full"}
                    onFinish={onSubmit}
                    layout={"vertical"}
                >
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"contract_number"}
                                   label={"Номер договора"}
                                   initialValue={role?.contract.number_contract}>
                            <Input disabled placeholder={"Введите номер договора"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"project_participants"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите участника проекта"
                                       }
                                   ]}
                                   label={"Участник проекта"}>
                            <Select placeholder={"Выберите участника проекта"}></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"organization_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите организацию"
                                       }
                                   ]}
                                   label={"Организация"}>
                            <Input placeholder={"Введите организацию"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"fullname"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ФИО контактного лица"
                                       }
                                   ]}
                                   label={"ФИО контактного лица"}>
                            <Input placeholder={"Введите ФИО контактного лица"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"post"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите должность"
                                       }
                                   ]}
                                   label={"Должность"}>
                            <Input placeholder={"Введите должность"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"department"}
                                   label={"Подразделение"}>
                            <Input placeholder={"Введите подразделение"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"phone_number"}
                                   label={"Контактный номер"}>
                            <Input placeholder={"Введите контактный номер"}/>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
                        <Button htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default OrganisationsModal;















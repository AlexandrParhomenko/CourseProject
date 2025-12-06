import {Button, Form, Input, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {
    useCreateOrganizationContact,
    useUpdateOrganizationContact
} from "@/services/api/organization-contact-person/organization-contact-person.ts";
import type {OrganizationContact} from "@/types/types.ts";
import {useGetOrganizationsByContractId} from "@/services/api/organisations/organisations.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: OrganizationContact
}

const OrganisationsModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<OrganizationContact>();
    const {role} = roleStore();
    const {user} = useUserStore();
    const {mutateAsync: createContact} = useCreateOrganizationContact();
    const {mutateAsync: updateContact} = useUpdateOrganizationContact();
    const {data: organizations} = useGetOrganizationsByContractId(role?.contract_id);

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<OrganizationContact>) => {
        if (!role?.contract_id) return;

        const payload: Partial<OrganizationContact> = {
            contract_id: role.contract_id,
            project_participants: values.project_participants,
            fullname: values.fullname,
            post: values.post,
            organization_id: values.organization_id,
            department: values.department,
            phone_number: values.phone_number,
            create_row_user_id: user?.user_id,
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

    useEffect(() => {
        if (isShow && picked && type === "update") {
            form.setFieldsValue({
                project_participants: picked.project_participants,
                organization_id: picked.organization_id,
                fullname: picked.fullname,
                post: picked.post,
                department: picked.department,
                phone_number: picked.phone_number
            })
        }
    }, [isShow]);

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => {
            form.resetFields()
            onClose()
        }} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра организаций</span>
                <Form
                    form={form}
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
                                           message: "Введите участника проекта"
                                       }
                                   ]}
                                   label={"Участник проекта"}>
                            <Input placeholder={"Введите участника проекта"}/>
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
                            <Select>
                                {organizations && organizations.map((el, idx) => <Select.Option value={el.organization_id} key={idx}>{el.organization}</Select.Option>)}
                            </Select>
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
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите подразделение"
                                       }
                                   ]}
                                   name={"department"}
                                   label={"Подразделение"}>
                            <Input placeholder={"Введите подразделение"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"phone_number"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите номер телефона"
                                       }
                                   ]}
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















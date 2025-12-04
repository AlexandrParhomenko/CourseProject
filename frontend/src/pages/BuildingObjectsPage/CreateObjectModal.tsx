import {type FC} from "react";
import {Button, Form, Input, Modal, Select, message} from "antd";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateObject} from "@/services/api/objects/objects.ts";
import type {Object} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
}

const CreateObjectModal: FC<IProps> = ({isShow, onClose}) => {
    const [form] = Form.useForm<Object>();
    const [messageApi, contextHolder] = message.useMessage();
    const {role} = roleStore();
    const {user} = useUserStore();
    const {mutateAsync: createObject, isPending} = useCreateObject();

    const onSubmit = async (values: Partial<Object>) => {
        if (!role?.contract_id) return;

        try {
            await createObject({
                contract_id: role.contract_id,
                number_object: values.number_object,
                abbreve_name_object: values.abbreve_name_object ?? null,
                full_name_object: values.full_name_object ?? "",
                create_row_user_id: user?.user_id
            });

            form.resetFields();
            onClose();
        } catch (e) {
            messageApi.open({
                type: "error",
                content: "Не удалось сохранить объект. Повторите попытку позже"
            });
        }
    };

    return (
        <Modal width={"50%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex flex-col"}>
                {contextHolder}
                <span className={"font-bold text-center"}>Новый объект</span>
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
                    <Form.Item className={"w-full"}
                               name={"number_contract"}
                               initialValue={role?.contract.number_contract}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите номер договора"
                                   }
                               ]}
                               label={"Номер договора"}>
                        <Select disabled value={role?.contract.number_contract}></Select>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"number_object"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите номер объекта"
                                   }
                               ]}
                               label={"Номер объекта"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"abbreve_name_object"}
                               label={"Сокращенное наименование объекта"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"full_name_object"}
                               label={"Полное наименование объекта"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
                        <Button htmlType="submit" loading={isPending}>Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default CreateObjectModal;
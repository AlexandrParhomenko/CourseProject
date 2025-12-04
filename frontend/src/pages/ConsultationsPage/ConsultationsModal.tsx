import {Button, DatePicker, Form, Input, Modal} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateConsultation} from "@/services/api/consultations/consultations.ts";
import type {Consultation} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
}

const ConsultationsModal: FC<IProps> = ({isShow, onClose}) => {
    const [form] = Form.useForm<Consultation>();
    const {role} = roleStore();
    const {user} = useUserStore();
    const {mutateAsync: createConsultation, isLoading} = useCreateConsultation();

    const onSubmit = async (values: Partial<Consultation>) => {
        if (!role?.contract_id) return;

        await createConsultation({
            contract_id: role.contract_id,
            date_cons: values.date_cons,
            content_cons: values.content_cons ?? "",
            result_cons: values.result_cons ?? "",
            create_row_user_id: user?.user_id,
        });

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра консультаций</span>
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
                                   initialValue={role?.contract.number_contract}
                        >
                            <Input disabled placeholder={"Введите номер договора"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_cons"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите дату"
                                       }
                                   ]}
                                   label={"Дата"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"content_cons"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите содержание обращения"
                                       }
                                   ]}
                                   label={"Содержание обращения"}>
                            <Input.TextArea rows={4} placeholder={"Введите содержание обращения"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"result_cons"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите результат рассмотрения"
                                       }
                                   ]}
                                   label={"Результат рассмотрения"}>
                            <Input.TextArea rows={4} placeholder={"Введите результат рассмотрения"}/>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
                        <Button htmlType="submit" loading={isLoading}>Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ConsultationsModal;















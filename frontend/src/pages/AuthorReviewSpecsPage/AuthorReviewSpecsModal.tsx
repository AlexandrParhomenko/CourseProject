import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore} from "@/store/store.ts";
import {useCreateSpecialist, useUpdateSpecialist} from "@/services/api/specialists/specialists.ts";
import type {Specialist} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: Specialist
}

const AuthorReviewSpecsModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<Specialist>();
    const {role} = roleStore();
    const {mutateAsync: createSpecialist, isLoading: isCreateLoading} = useCreateSpecialist();
    const {mutateAsync: updateSpecialist, isLoading: isUpdateLoading} = useUpdateSpecialist();

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<Specialist>) => {
        if (!role?.contract_id) return;

        const payload: Partial<Specialist> = {
            contract_id: role.contract_id,
            fullname: values.fullname ?? "",
            post_specialist: values.post_specialist ?? "",
            phone_number: values.phone_number ?? "",
            number_doc: values.number_doc!,
            date_doc: values.date_doc!,
            type_work: values.type_work,
        };

        if (isUpdate && picked) {
            await updateSpecialist({id: picked.specialist_id, data: payload});
        } else {
            await createSpecialist(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра специалистов авторского надзора</span>
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
                                   label={"Номер договора"}>
                            <Input placeholder={"Введите номер договора"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"fullname"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ФИО"
                                       }
                                   ]}
                                   label={"ФИО"}>
                            <Input placeholder={"Введите ФИО"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"post_specialist"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите должность"
                                       }
                                   ]}
                                   label={"Должность"}>
                            <Select placeholder={"Выберите должность"}></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"phone_number"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите номер телефона"
                                       }
                                   ]}
                                   label={"Номер телефона"}>
                            <Input placeholder={"Введите номер телефона"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"type_work"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите вид работы"
                                       }
                                   ]}
                                   label={"Вид работы, по которой осуществляется авторский надзор"}>
                            <Select 
                                mode="multiple"
                                placeholder={"Выберите вид работы"}
                                allowClear>
                            </Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"number_doc"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите номер документа Приказ №"
                                       }
                                   ]}
                                   label={"Номер документа Приказ №____"}>
                            <Input placeholder={"Введите номер приказа"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_doc"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите дату документа о полномочиях"
                                       }
                                   ]}
                                   label={"Дата документа о полномочиях. Приказ от ______"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
                        <Button htmlType="submit" loading={isCreateLoading || isUpdateLoading}>Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default AuthorReviewSpecsModal;












import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore} from "@/store/store.ts";
import {useCreateVisitSheet, useUpdateVisitSheet} from "@/services/api/visit-sheets/visit-sheets.ts";
import type {VisitSheet} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: VisitSheet
}

const RegVisitListModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<VisitSheet>();
    const {role} = roleStore();
    const {mutateAsync: createVisitSheet} = useCreateVisitSheet();
    const {mutateAsync: updateVisitSheet} = useUpdateVisitSheet();

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<VisitSheet>) => {
        if (!role?.contract_id) return;

        const payload: Partial<VisitSheet> = {
            contract_id: role.contract_id,
            specialist_id: values.specialist_id!,
            date_arrival: values.date_arrival!,
            date_departure: values.date_departure!,
        };

        if (isUpdate && picked) {
            await updateVisitSheet({id: picked.visit_sheet_id, data: payload});
        } else {
            await createVisitSheet(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись регистрационного листа посещения объекта</span>
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
                    <div className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"specialist_id"}
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
                                   name={"date_arrival"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите дату приезда"
                                       }
                                   ]}
                                   label={"Дата приезда"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_departure"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите дату отъезда"
                                       }
                                   ]}
                                   label={"Дата отъезда"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"contact_persons"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите контактирующие лица"
                                       }
                                   ]}
                                   label={"Контактирующие лица"}>
                            <Select 
                                mode="multiple"
                                placeholder={"Выберите контактирующие лица"}
                                allowClear>
                            </Select>
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

export default RegVisitListModal;












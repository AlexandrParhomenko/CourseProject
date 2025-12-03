import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType, MainJournal} from "@typings/types.ts";
import {roleStore} from "@/store/store.ts";
import {useCreateMainJournal, useUpdateMainJournal} from "@/services/api/main-journal/main-journal.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: MainJournal
}

const SupervisionJournalModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<MainJournal>();
    const {role} = roleStore();
    const {mutateAsync: createMainJournal} = useCreateMainJournal();
    const {mutateAsync: updateMainJournal} = useUpdateMainJournal();

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<MainJournal>) => {
        if (!role?.contract_id) return;

        const payload: Partial<MainJournal> = {
            contract_id: role.contract_id,
            date_supervision: values.date_supervision!,
            brand_id: values.brand_id!,
            defects: values.defects ?? "",
            instructions: values.instructions ?? "",
            importance_defect_id: values.importance_defect_id!,
            visit_sheet_id: values.visit_sheet_id!,
            deadline_eliminate: values.deadline_eliminate ?? "",
            elimination: values.elimination ?? false,
            path_to_drawing: values.path_to_drawing ?? "",
        };

        if (isUpdate && picked) {
            await updateMainJournal({main_journal_id: picked.main_journal_id, data: payload});
        } else {
            await createMainJournal(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись журнала</span>
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
                                   initialValue={role?.contract.number_contract}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_supervision"}
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
                                   name={"brand_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ID марки РД"
                                       }
                                   ]}
                                   label={"ID марки РД"}>
                            <Input type={"number"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"defects"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите выявленные отступления / нарушения"
                                       }
                                   ]}
                                   label={"Выявленные отступления / нарушения"}>
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"instructions"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите указания об устранении"
                                       }
                                   ]}
                                   label={"Указания об устранении"}>
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"importance_defect_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ID значимости отступления"
                                       }
                                   ]}
                                   label={"ID значимости отступления"}>
                            <Input type={"number"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"visit_sheet_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ID регистрационного листа посещения"
                                       }
                                   ]}
                                   label={"ID регистрационного листа посещения"}>
                            <Input type={"number"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"deadline_eliminate"}
                                   label={"Срок устранения"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"elimination"}
                                   label={"Отметка о выполнении указаний"}>
                            <Select>
                                <Select.Option value={true}>Выполнено</Select.Option>
                                <Select.Option value={false}>Не выполнено</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"path_to_drawing"}
                                   label={"Гиперссылка на фото/чертеж авторского надзора"}>
                            <Input/>
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

export default SupervisionJournalModal;
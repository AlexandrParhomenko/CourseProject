import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType, MainJournal} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateMainJournal, useUpdateMainJournal} from "@/services/api/main-journal/main-journal.ts";
import dayjs from "dayjs";
import {useGetBrandsByContractId} from "@/services/api/brands/brands.ts";
import {useGetAllDefects} from "@/services/api/defects/defects.ts";
import {useGetVisitSheetsByContractId} from "@/services/api/visit-sheets/visit-sheets.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: MainJournal
}

const SupervisionJournalModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm();
    const {role} = roleStore();
    const {user} = useUserStore();
    const {mutateAsync: createMainJournal} = useCreateMainJournal();
    const {mutateAsync: updateMainJournal} = useUpdateMainJournal();
    const {data: brands} = useGetBrandsByContractId(role?.contract_id);
    const {data: defects} = useGetAllDefects();
    const {data: lists} = useGetVisitSheetsByContractId(role?.contract_id);
    const onSubmit = async (values: Partial<MainJournal>) => {
        if (!role?.contract_id) return;
        const payload: Partial<MainJournal> = {
            contract_id: role.contract_id,
            date_supervision: values.date_supervision,
            brand_id: values.brand_id,
            defects: values.defects,
            instructions: values.instructions,
            importance_defect_id: values.importance_defect_id,
            visit_sheet_id: values.visit_sheet_id,
            deadline_eliminate: values.deadline_eliminate,
            updated_elimination_at_true: values.updated_elimination_at_true,
            elimination: values.elimination,
            path_to_drawing: values.path_to_drawing,
            create_row_user_id: user?.user_id
        };

        if (type === "update" && picked) {
            await updateMainJournal({main_journal_id: picked.main_journal_id, data: payload});
        } else {
            await createMainJournal(payload);
        }
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (isShow && type === "update" && picked) {
            form.setFieldsValue({
                date_supervision: picked.date_supervision ? dayjs(picked.date_supervision) : null,
                brand_id: picked.brand_id,
                defects: picked.defects,
                instructions: picked.instructions,
                importance_defect_id: picked.importance_defect_id,
                visit_sheet_id: picked.visit_sheet_id,
                deadline_eliminate: picked.deadline_eliminate ? dayjs(picked.deadline_eliminate) : null,
                updated_elimination_at_true: picked.updated_elimination_at_true ? dayjs(picked.updated_elimination_at_true) : null,
                elimination: picked.elimination,
                path_to_drawing: picked.path_to_drawing,
            })
        }
    }, [isShow]);

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => {
            form.resetFields();
            onClose();
        }} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись журнала</span>
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
                                   label={"Марка РД"}>
                            <Select>
                                {brands && brands.map((el, idx) => <Select.Option key={idx} value={el.brand_id}>{el.name_brand}</Select.Option>)}
                            </Select>
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
                                           message: "Введите значимость отступления"
                                       }
                                   ]}
                                   label={"Значимости отступления"}>
                            <Select>
                                {defects && defects.map((el, idx) => <Select.Option key={idx} value={el.importance_defect_id}>{el.importance_defect}</Select.Option>)}
                            </Select>
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
                            <Select>
                                {lists && lists.map((el, idx) => <Select.Option key={idx} value={el.visit_sheet_id}>{el.visit_sheet_id} от {dayjs(el.date_arrival).format("DD.MM.YYYY")}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"deadline_eliminate"}
                                   label={"Срок устранения"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"updated_elimination_at_true"}
                                   label={"Дата выполнения указаний"}>
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
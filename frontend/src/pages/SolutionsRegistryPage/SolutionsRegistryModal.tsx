import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType, TechnicalRegistry} from "@typings/types.ts";
import {roleStore} from "@/store/store.ts";
import {
    useCreateTechnicalRegistry,
    useUpdateTechnicalRegistry
} from "@/services/api/register-technical-solutions/register-technical-solutions.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: TechnicalRegistry
}

const SolutionsRegistryModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<TechnicalRegistry>();
    const {role} = roleStore();
    const {mutateAsync: createTechnicalRegistry} = useCreateTechnicalRegistry();
    const {mutateAsync: updateTechnicalRegistry} = useUpdateTechnicalRegistry();

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<TechnicalRegistry>) => {
        if (!role?.contract_id) return;

        const payload: Partial<TechnicalRegistry> = {
            contract_id: role.contract_id,
            date_solution: values.date_solution!,
            main_journal_id: values.main_journal_id!,
            full_brand_code: values.full_brand_code ?? "",
            reason_change: values.reason_change ?? "",
            path_photo_sol: values.path_photo_sol ?? "",
            status_compliance: values.status_compliance ?? "",
            note: values.note ?? "",
        };

        if (isUpdate && picked) {
            await updateTechnicalRegistry({
                registry_technical_solutions: picked.registry_technical_solution_id,
                data: payload
            });
        } else {
            await createTechnicalRegistry(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра технических решений</span>
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
                            <Input disabled value={role?.contract.number_contract}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_solution"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите дату записи в ЖАНе"
                                       }
                                   ]}
                                   label={"Дата записи в ЖАНе"}>
                            <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"main_journal_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ID записи в ЖАНе"
                                       }
                                   ]}
                                   label={"ID записи в ЖАНе"}>
                            <Input type={"number"} placeholder={"ID записи в ЖАНе"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"full_brand_code"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите РД (шифр марки)"
                                       }
                                   ]}
                                   label={"РД (шифр марки)"}>
                            <Input placeholder={"Введите РД (шифр марки)"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"reason_change"}
                                   label={"Причина изменения"}>
                            <Input.TextArea rows={4} placeholder={"Введите причину изменения"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"path_photo_sol"}
                                   label={"Запись в ЖАНе"}>
                            <Input placeholder={"+ Гиперссылка на файл"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"status_compliance"}
                                   label={"Статус внесения в РД"}>
                            <Select placeholder={"Выберите статус внесения в РД"}></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"note"}
                                   label={"Примечание"}>
                            <Input.TextArea rows={4} placeholder={"Введите примечание"}/>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type={"link"} onClick={onClose}>Отменить</Button>
                        <Button htmlType="submit" className={"ml-2"}>Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default SolutionsRegistryModal;


import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType, TechnicalRegistry} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {
    useCreateTechnicalRegistry,
    useUpdateTechnicalRegistry
} from "@/services/api/register-technical-solutions/register-technical-solutions.ts";
import {useGetMainJournalsByContractId} from "@/services/api/main-journal/main-journal.ts";
import dayjs from "dayjs";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: TechnicalRegistry
}

const SolutionsRegistryModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm();
    const {role} = roleStore();
    const {user} = useUserStore();
    const {mutateAsync: createTechnicalRegistry} = useCreateTechnicalRegistry();
    const {mutateAsync: updateTechnicalRegistry} = useUpdateTechnicalRegistry();
    const {data: journal} = useGetMainJournalsByContractId(role?.contract_id);
    const onSubmit = async (values: Partial<TechnicalRegistry>) => {
        if (!role?.contract_id) return;

        const payload: Partial<TechnicalRegistry> = {
            contract_id: role.contract_id,
            date_solution: values.date_solution,
            main_journal_id: values.main_journal_id,
            full_brand_code: values.full_brand_code,
            reason_change: values.reason_change,
            path_photo_sol: values.path_photo_sol,
            status_compliance: values.status_compliance,
            note: values.note,
            create_row_user_id: user?.user_id,
        };

        if (type === "update" && picked) {
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

    useEffect(() => {
        if (isShow && type == "update" && picked) {
            form.setFieldsValue({
                date_solution: dayjs(picked.date_solution),
                main_journal_id: picked.main_journal_id,
                full_brand_code: picked.full_brand_code,
                reason_change: picked.reason_change,
                path_photo_sol: picked.path_photo_sol,
                status_compliance: picked.status_compliance,
                note: picked.note
            })
        }
    }, [isShow]);

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => {
            form.resetFields();
            onClose();
        }} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра технических решений</span>
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
                                   initialValue={role?.contract.number_contract}
                                   label={"Номер договора"}>
                            <Input disabled/>
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
                            <DatePicker showTime={false} className={"w-full"} format={"DD.MM.YYYY"}/>
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
                            <Select placeholder={"ID записи в ЖАНе"}>
                                {journal && journal.map((el, idx) => <Select.Option key={idx} value={el.main_journal_id}>{el.main_journal_id} от {dayjs(el.date_supervision).format("DD.MM.YYYY")}</Select.Option>)}
                            </Select>
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
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите причину изменения"
                                       }
                                   ]}
                                   label={"Причина изменения"}>
                            <Input.TextArea rows={4} placeholder={"Введите причину изменения"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ссылку"
                                       }
                                   ]}
                                   name={"path_photo_sol"}
                                   label={"Запись в ЖАНе"}>
                            <Input placeholder={"+ Гиперссылка на файл"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"status_compliance"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите статус"
                                       }
                                   ]}
                                   label={"Статус внесения в РД"}>
                            <Input placeholder={"Выберите статус внесения в РД"}/>
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


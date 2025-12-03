import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore} from "@/store/store.ts";
import {useCreateRegistry, useUpdateRegistry} from "@/services/api/registry/registry.ts";
import type {Registry} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: Registry
}

const IDTRegistryModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<Registry>();
    const {role} = roleStore();
    const {mutateAsync: createRegistry, isLoading: isCreateLoading} = useCreateRegistry();
    const {mutateAsync: updateRegistry, isLoading: isUpdateLoading} = useUpdateRegistry();

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<Registry>) => {
        if (!role?.contract_id) return;

        const payload: Partial<Registry> = {
            contract_id: role.contract_id,
            type_work: values.type_work ?? "",
            type_doc_id: values.type_doc_id!,
            date_of_review: values.date_of_review ?? null,
            date_signing_doc: values.date_signing_doc ?? null,
            path_to_doc_signed: values.path_to_doc_signed ?? null,
            path_to_doc_with_note: values.path_to_doc_with_note ?? null,
        };

        if (isUpdate && picked) {
            await updateRegistry({registry_id: picked.registry_id, data: payload});
        } else {
            await createRegistry(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра ИТД</span>
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
                                   name={"brand_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите марку РД"
                                       }
                                   ]}
                                   label={"Марка РД, которой соответствует ИТД"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"type_work"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите вид работ"
                                       }
                                   ]}
                                   label={"Вид работ"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"type_doc_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите вид документа"
                                       }
                                   ]}
                                   label={"Вид документа в составе ИТД (АОК, АОСР, ...)"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_of_review"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите дату передачи"
                                       }
                                   ]}
                                   label={"Передача на рассмотрение в ПАО \"ОНХП\""}>
                            <DatePicker className={"w-full"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"date_signing_doc"}
                                   label={"Подписание документа представителем ПАО \"ОНХП\""}>
                            <DatePicker className={"w-full"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"path_to_doc_signed"}
                                   label={"Гиперссылка на документ с подписью представителя АН ПАО \"ОНХП\" (при наличии)"}>
                            <Input placeholder={"Введите гиперссылку"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"path_to_doc_with_note"}
                                   label={"Гиперссылка на документ с замечаниями представителя АН ПАО \"ОНХП\" (при наличии)"}>
                            <Input placeholder={"Введите гиперссылку"}/>
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

export default IDTRegistryModal;



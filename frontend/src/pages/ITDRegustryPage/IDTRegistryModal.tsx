import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const IDTRegistryModal: FC<IProps> = ({isShow, onClose, type}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра ИТД</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit} layout={"vertical"}>
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"rd_marking"}
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
                                   name={"work_type"}
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
                                   name={"document_type"}
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
                                   name={"transfer_date"}
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
                                   name={"signing_date"}
                                   label={"Подписание документа представителем ПАО \"ОНХП\""}>
                            <DatePicker className={"w-full"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"signed_document_link"}
                                   label={"Гиперссылка на документ с подписью представителя АН ПАО \"ОНХП\" (при наличии)"}>
                            <Input placeholder={"Введите гиперссылку"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"comments_document_link"}
                                   label={"Гиперссылка на документ с замечаниями представителя АН ПАО \"ОНХП\" (при наличии)"}>
                            <Input placeholder={"Введите гиперссылку"}/>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={() => {
                            onClose()
                        }}>Отменить</Button>
                        <Button htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default IDTRegistryModal;



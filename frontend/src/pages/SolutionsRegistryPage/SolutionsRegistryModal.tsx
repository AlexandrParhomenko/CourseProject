import {Button, DatePicker, Form, Input, Modal, Select, Upload} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const SolutionsRegistryModal: FC<IProps> = ({isShow, onClose, type}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра технических решений</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit} layout={"vertical"}>
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"contract_number"}
                                   label={"Номер договора"}>
                            <Input placeholder={"Введите номер договора"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"journal_date"}
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
                                   name={"journal_content"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите краткое содержание в ЖАНе"
                                       }
                                   ]}
                                   label={"Краткое содержание в ЖАНе"}>
                            <Select placeholder={"Краткое содержание в ЖАНе"}></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"rd_marking"}
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
                                   name={"change_reason"}
                                   label={"Причина изменения"}>
                            <Input.TextArea rows={4} placeholder={"Введите причину изменения"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"journal_file"}
                                   label={"Запись в ЖАНе"}>
                            <Upload>
                                <Button>+ Файл</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"rd_status"}
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
                        <Button type={"link"} onClick={() => {
                            onClose()
                        }}>Отменить</Button>
                        <Button htmlType="submit" className={"ml-2"}>Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default SolutionsRegistryModal;


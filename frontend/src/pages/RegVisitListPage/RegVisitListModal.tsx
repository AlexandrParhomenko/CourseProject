import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const RegVisitListModal: FC<IProps> = ({isShow, onClose}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись регистрационного листа посещения объекта</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit} layout={"vertical"}>
                    <div className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"fio"}
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
                                   name={"arrival_date"}
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
                                   name={"departure_date"}
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

export default RegVisitListModal;


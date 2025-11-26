import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const AuthorReviewSpecsModal: FC<IProps> = ({isShow, onClose, type}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра специалистов авторского надзора</span>
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
                                   name={"position"}
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
                                   name={"phone"}
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
                                   name={"work_type"}
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
                                   name={"order_number"}
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
                                   name={"order_date"}
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

export default AuthorReviewSpecsModal;








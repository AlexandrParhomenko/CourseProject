import {Button, DatePicker, Form, Input, Modal} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const ConsultationsModal: FC<IProps> = ({isShow, onClose}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра консультаций</span>
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
                                   name={"date"}
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
                                   name={"appeal_content"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите содержание обращения"
                                       }
                                   ]}
                                   label={"Содержание обращения"}>
                            <Input.TextArea rows={4} placeholder={"Введите содержание обращения"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"review_result"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите результат рассмотрения"
                                       }
                                   ]}
                                   label={"Результат рассмотрения"}>
                            <Input.TextArea rows={4} placeholder={"Введите результат рассмотрения"}/>
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

export default ConsultationsModal;









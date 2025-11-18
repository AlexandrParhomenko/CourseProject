import {Button, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";

interface IProps {
    isShow: boolean
    onClose: Function
}

const CreateMarkingModal: FC<IProps> = ({isShow, onClose}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новое наименование</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit}
                      layout={"vertical"}>
                    <Form.Item className={"w-full"}
                               name={"user_login"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите номер договора"
                                   }
                               ]}
                               label={"Номер договора"}>
                        <Select></Select>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"user_login"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите шифр марки"
                                   }
                               ]}
                               label={"Шифр марки"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"user_login"}
                               label={"Распределение по стадиям"}>
                        <Input></Input>
                    </Form.Item>
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

export default CreateMarkingModal;
import {Button, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";

interface IProps {
    isShow: boolean
    onClose: Function
}

const SrdMarkingModal: FC<IProps> = ({isShow, onClose}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новая марка</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit} layout={"vertical"}>
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
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
                                           message: "Введите номер объекта"
                                       }
                                   ]}
                                   label={"Номер объекта"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Титул"}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите дисциплину"
                                       }
                                   ]}
                                   label={"Дисциплина"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Марка РД"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите секцию"
                                       }
                                   ]}
                                   label={"Секция"}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Подсекция"}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Наименование марки"}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Примечание"}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите блок СРД"
                                       }
                                   ]}
                                   label={"Блок СРД"}>
                            <Select></Select>
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

export default SrdMarkingModal;
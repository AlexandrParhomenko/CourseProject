import {type FC} from "react";
import {Button, Form, Input, Modal, Select} from "antd";

interface IProps {
    isShow: boolean
    onClose: Function
}

const CreateObjectModal: FC<IProps> = ({isShow, onClose}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"50%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex flex-col"}>
                <span className={"font-bold text-center"}>Новый объект</span>
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
                                       message: "Введите номер объекта"
                                   }
                               ]}
                               label={"Номер объекта"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"user_login"}
                               label={"Сокращенное наименование объекта"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"user_login"}
                               label={"Полное наименование объекта"}>
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

export default CreateObjectModal;
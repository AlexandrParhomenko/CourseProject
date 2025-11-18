import {Button, Form, Input, Modal} from "antd";
import type {FC} from "react";

interface IProps {
    isShow: boolean
    onClose: Function
}

const RetreatsImportanceModal: FC<IProps> = ({isShow, onClose}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новая значимость</span>
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
                                       message: "Введите значимость"
                                   }
                               ]}
                               label={"Значимость отступления, нарушения"}>
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

export default RetreatsImportanceModal;
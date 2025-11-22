import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {User, ModalType} from "../../types/types.ts";

interface Props {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const SetRolesModal: FC<Props> = ({isShow, onClose, type}) => {
    const { RangePicker } = DatePicker;
    const onSubmit = (values: User) => {
        console.log(values)
    }

    return (
        <Modal width={400} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>{type === "create" ? "Назначить роли" : "Изменить роль"}</span>
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
                                       message: "Выберите пользователя"
                                   }
                               ]}
                               label={"Пользователь"}>
                        <Select></Select>
                    </Form.Item>
                    <Form.Item label={"Роль"}
                               name={"user_password"}
                               className={"w-full"}
                               rules={[
                                   {required: true, message: "Выберите роль"}
                               ]}>
                        <Select placeholder={"Администратор"}></Select>
                    </Form.Item>
                    <Form.Item label={"Номер договора"}
                               name={"user_password"}
                               className={"w-full"}
                               rules={[
                                   {required: true, message: "Введите номер договора"}
                               ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label={"Сроки назначения"}
                               name={"fio"}
                               className={"w-full"}
                               hasFeedback
                               rules={[
                                   {required: true, message: "Введите сроки назначения"}
                               ]}>
                        <RangePicker className={"w-full"} format={"DD.MM.YYYY"}/>
                    </Form.Item>
                    <Button htmlType="submit" className={"w-full"}>{type === "create" ? "Назначить" : "Изменить"}</Button>
                </Form>
            </div>
        </Modal>
    );
};

export default SetRolesModal;
import {Button, Form, Input, Modal} from "antd";
import type {FC} from "react";
import type {ICreateUser, ModalType} from "../../types/types.ts";

interface Props {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const AddUserModal: FC<Props> = ({isShow, onClose, type}) => {

    const onSubmit = (values: ICreateUser) => {
        console.log(values)
    }

    return (
        <Modal width={400} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>{type === "create" ? "Новый пользователь" : "Изменить пользователя"}</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit}
                      layout={"vertical"}>
                    <Form.Item className={"w-full"}
                               name={"user_login"}
                               hasFeedback
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите логин"
                                   },
                                   {whitespace: true, message: "Логин не может быть пустым"}
                               ]}
                               label={"Логин"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label={"Пароль"}
                               name={"user_password"}
                               className={"w-full"}
                               hasFeedback
                               rules={[
                                   {required: true, message: "Пароль не может быть пустым"},
                                   {min: 5, message: "Пароль не может быть короче 5 символов"}
                               ]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item label={"ФИО"}
                               name={"fio"}
                               className={"w-full"}
                               hasFeedback
                               rules={[
                                   {required: true, message: "Введите фамилию"}
                               ]}>
                        <Input type={"number"} min={1}/>
                    </Form.Item>
                    <Button htmlType="submit" className={"w-full"}>{type === "create" ? "Создать пользователя" : "Изменить пользователя"}</Button>
                </Form>
            </div>
        </Modal>
    );
};

export default AddUserModal;
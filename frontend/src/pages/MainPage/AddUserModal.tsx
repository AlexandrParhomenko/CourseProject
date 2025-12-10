import {Button, Form, Input, message, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType, Registration} from "@/types/types.ts";
import {useRegister} from "@/services/api/auth/auth.ts";
import {useGetUsers, useUpdateUserRole} from "@/services/api/users/users.ts";

interface Props {
  isShow: boolean
  onClose: Function
  type: ModalType
}

const AddUserModal: FC<Props> = ({isShow, onClose, type}) => {
  const {mutate: register, isPending, data} = useRegister()
  const {data: users} = useGetUsers()
  const {mutate: updateUser, data: putData} = useUpdateUserRole()
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = (values: Registration) => {
    const data = {
      login: values.login,
      fullname: values.fullname,
      hash_password: values.hash_password
    }
    if (type === "create") {
      register(data)
    } else {
      const pickedUser = users && users.find(el => el.login === values.login)
      if (pickedUser) {
        updateUser({id: pickedUser.user_id, data: data})
      } else {
        messageApi.open({
          type: "error",
          content: `Пользователь с логином ${values.login} не найден`
        });
      }
    }
  }

  useEffect(() => {
    if (data || putData) {
      messageApi.open({
        type: "success",
        content: "Аккаунт успешно зарегистрирован"
      });
    }
  }, [data, putData]);

  return (
    <Modal width={400} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
      {contextHolder}
      <div className={"flex items-center flex-col justify-center"}>
        <span className={"font-bold"}>{type === "create" ? "Новый пользователь" : "Изменить пользователя"}</span>
        <Form scrollToFirstError={{
          behavior: "smooth",
          block: "center",
          inline: "center"
        }} className={"flex items-center flex-col w-full"} onFinish={onSubmit}
              layout={"vertical"}>
          <Form.Item className={"w-full"}
                     name={"login"}
                     hasFeedback
                     initialValue={null}
                     rules={[
                       {
                         required: true,
                         message: "Введите логин"
                       }
                     ]}
                     label={"Логин"}>
            {type === "create" ? <Input/> : <Select>{users && users.map((el, idx) => <Select.Option key={idx}
                                                                     value={el.login}>{el.login}</Select.Option>)}</Select>}
          </Form.Item>
          <Form.Item label={"Пароль"}
                     name={"hash_password"}
                     className={"w-full"}
                     initialValue={null}
                     hasFeedback
                     rules={[
                       {required: true, message: "Пароль не может быть пустым"},
                       {min: 5, message: "Пароль не может быть короче 5 символов"}
                     ]}>
            <Input.Password/>
          </Form.Item>
          <Form.Item label={"ФИО"}
                     name={"fullname"}
                     initialValue={null}
                     className={"w-full"}
                     hasFeedback
                     rules={[
                       {required: true, message: "Введите фамилию"}
                     ]}>
            <Input/>
          </Form.Item>
          <Button loading={isPending} htmlType="submit"
                  className={"w-full"}>{type === "create" ? "Создать пользователя" : "Изменить пользователя"}</Button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
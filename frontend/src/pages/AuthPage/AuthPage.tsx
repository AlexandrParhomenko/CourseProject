import {Button, Form, type FormInstance, Input, message} from "antd";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import routes from "../../router/routes.ts";

const AuthPage = () => {
    const ref = useRef<FormInstance>(null);
    const [messageApi, contextHolder] = message.useMessage();
    document.title = "Вход";
    const navigate = useNavigate();

    const onAuth = () => {
        navigate(routes.main)
    };

    return (
        <div className={"flex justify-center"}>
            {contextHolder}
            <div className={"rounded-lg shadow-lg bg-white p-6 mt-50 w-100 h-100"}>
                <div className={"border-b-2 border-amber-100 pb-2 mb-4"}>
                    <span>Вход</span>
                </div>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} ref={ref} className={"flex items-center flex-col w-full"} onFinish={onAuth}
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
                                   {min: 8, message: "Пароль не может быть короче 8 символов"}
                               ]}>
                        <Input.Password autoFocus onPressEnter={() => {
                            if (ref.current) {
                                ref.current.submit();
                            }
                        }}/>
                    </Form.Item>
                    <Form.Item label={"Номер договора"}
                               name={"contract_number"}
                               className={"w-full"}
                               hasFeedback
                               rules={[
                                   {required: true, message: "Введите номер договора"}
                               ]}>
                        <Input type={"number"} min={1}/>
                    </Form.Item>
                    <Button htmlType="submit" className={"w-full"}>Вход</Button>
                </Form>
            </div>
        </div>
    );
};

export default AuthPage;
import {Button, Form, type FormInstance, Input, message} from "antd";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import routes from "../../router/routes.ts";
import type {LoginRequest} from "@/types/types.ts";
import {messageResponse} from "@/utils.ts";
import {useGetUserRoles, useLogin} from "@/services/api/auth/auth.ts";
import {roleStore, useUserStore} from "@/store/store.ts";

const AuthPage = () => {
  const ref = useRef<FormInstance>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const login = useLogin()
  const {user, setUser} = useUserStore();
  const {setRole} = roleStore();
  const {data, isLoading} = useGetUserRoles(user?.user_id);
  document.title = "Вход";
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token && user) {
      navigate(routes.main, {replace: true});
    }
  }, [user, navigate]);

  const onAuth = async (values: LoginRequest) => {
    await login.mutateAsync({
      login: values.login,
      hash_password: values.password
    });
  };

  useEffect(() => {
    if (data && user?.user_id) {
      data.length > 0 && setRole(data[0])
      sessionStorage.setItem("token", user.token);
      navigate(routes.main, {replace: true});
    }
  }, [data, user, navigate]);

  useEffect(() => {
    if (login.data) {
      setUser(login.data);
    }
  }, [login.data]);

  useEffect(() => {
    if (login.error) {
      messageResponse(messageApi, "error", login.error.message)
    }
  }, [login.error]);

  return (
    <div className={"flex justify-center"}>
      {contextHolder}
      <div className={"rounded-lg shadow-lg bg-white p-6 mt-50 w-100"}>
        <div className={"border-b-2 border-amber-100 pb-2 mb-4"}>
          <span>Вход</span>
        </div>
        <Form ref={ref} className={"flex items-center flex-col w-full"} onFinish={onAuth} layout={"vertical"}>
          <Form.Item className={"w-full"}
                     name={"login"}
                     initialValue={"IvanovII"}
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
                     name={"password"}
                     initialValue={"123456"}
                     className={"w-full"}
                     hasFeedback
                     rules={[
                       {required: true, message: "Пароль не может быть пустым"},
                       {min: 6, message: "Пароль не может быть короче 6 символов"}
                     ]}>
            <Input.Password autoFocus onPressEnter={() => {
              if (ref.current) {
                ref.current.submit();
              }
            }}/>
          </Form.Item>
          {/*<Form.Item label={"Номер договора"}*/}
          {/*           name={"contract_number"}*/}
          {/*           className={"w-full"}*/}
          {/*           hasFeedback*/}
          {/*           rules={[*/}
          {/*               {required: true, message: "Введите номер договора"}*/}
          {/*           ]}>*/}
          {/*    <Input type={"number"} min={1}/>*/}
          {/*</Form.Item>*/}
          <Button loading={isLoading} htmlType="submit" className={"w-full"}>Вход</Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
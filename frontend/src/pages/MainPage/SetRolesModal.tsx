import {Button, DatePicker, Form, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType} from "@/types/types.ts";
import {roles_ids} from "@/constants/constants.ts";
import {useGetUsers} from "@/services/api/users/users.ts";
import {useGetAllContracts} from "@/services/api/contracts/contracts.ts";
import {useCreateUserRole, useUpdateUserRole} from "@/services/api/user-roles/user-roles.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import dayjs from "dayjs";

interface Props {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const SetRolesModal: FC<Props> = ({isShow, onClose, type}) => {
    const { RangePicker } = DatePicker;
    const {user} = useUserStore()
    const {role} = roleStore()
    const {data: contracts} = useGetAllContracts()
    const {data: users} = useGetUsers()
    const {mutate: createRole, data: createData} = useCreateUserRole()
    const {mutate: updateRole, data: updateData} = useUpdateUserRole()
    const onSubmit = (values: {user_id: number, contract_id: number, role_id: number, role_date: string[]}) => {
        if (type === "create") {
            createRole({
                user_id: values.user_id,
                contract_id: values.contract_id,
                role_id: values.role_id,
                date_start: dayjs(values.role_date[0]).format("YYYY-MM-DD"),
                date_end: dayjs(values.role_date[1]).format("YYYY-MM-DD"),
                create_row_user_id: user?.user_id
            })
        } else if (type === "update" && role) {
            updateRole({
                id: role.user_role_id,
                data: {
                    user_id: values.user_id,
                    contract_id: values.contract_id,
                    role_id: values.role_id,
                    date_start: dayjs(values.role_date[0]).format("YYYY-MM-DD"),
                    date_end: dayjs(values.role_date[1]).format("YYYY-MM-DD"),
                    create_row_user_id: user?.user_id
                }
            })
        }
    }

    useEffect(() => {
        if (createData || updateData) {
            onClose()
        }
    }, [createData, updateData]);

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
                               initialValue={type === "create" ? null : user?.user_id}
                               name={"user_id"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Выберите пользователя"
                                   }
                               ]}
                               label={"Пользователь"}>
                        <Select disabled={type === "update"}>
                            {users && users.map((el, idx) => <Select.Option key={idx} value={el.user_id}>{el.fullname}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Роль"}
                               name={"role_id"}
                               className={"w-full"}
                               initialValue={type === "create" ? null : role?.role_id}
                               rules={[
                                   {required: true, message: "Выберите роль"}
                               ]}>
                        <Select>
                            {Object.entries(roles_ids).map((el, idx) => <Select.Option key={idx} value={parseInt(el[0])}>{el[1]}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Номер договора"}
                               name={"contract_id"}
                               initialValue={type === "create" ? null : role?.contract_id}
                               className={"w-full"}
                               rules={[
                                   {required: true, message: "Введите номер договора"}
                               ]}>
                        <Select>
                            {contracts && contracts.map((el, idx) => <Select.Option key={idx} value={el.contract_id}>{el.number_contract}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Сроки назначения"}
                               name={"role_date"}
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
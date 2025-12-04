import {Button, Form, Input, Modal, message} from "antd";
import type {FC} from "react";
import type {TypeWork} from "@/types/types.ts";
import {useCreateTypeWork} from "@/services/api/type-works/type-works.ts";
import {useUserStore} from "@/store/store.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    picked?: TypeWork
}

const WorkTypesModal: FC<IProps> = ({isShow, onClose, picked}) => {
    const [form] = Form.useForm<TypeWork>();
    const {user} = useUserStore()
    const [messageApi, contextHolder] = message.useMessage();
    const {mutateAsync: createTypeWork} = useCreateTypeWork();

    const onSubmit = async (values: Partial<TypeWork>) => {
        const payload: Partial<TypeWork> = {
            category_work: values.category_work ?? "",
            type_work: values.type_work ?? "",
            name_work: values.name_work ?? "",
            create_row_user_id: user?.user_id,
        };

        try {
            await createTypeWork(payload);
            form.resetFields();
            onClose();
        } catch (e) {
            messageApi.open({
                type: "error",
                content: "Не удалось сохранить вид работ. Повторите попытку позже"
            });
        }
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                {contextHolder}
                <span className={"font-bold"}>Новый перечень</span>
                <Form
                    form={form}
                    initialValues={picked}
                    scrollToFirstError={{
                        behavior: "smooth",
                        block: "center",
                        inline: "center"
                    }}
                    className={"flex items-center flex-col w-full"}
                    onFinish={onSubmit}
                    layout={"vertical"}
                >
                    <Form.Item className={"w-full"}
                               name={"category_work"}
                               label={"Категория работ"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"type_work"}
                               label={"Тип работы"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"name_work"}
                               label={"Наименование работы"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
                        <Button htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default WorkTypesModal;
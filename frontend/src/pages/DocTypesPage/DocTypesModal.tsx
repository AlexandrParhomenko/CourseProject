import {Button, Form, Input, Modal} from "antd";
import type {FC} from "react";
import type {TypeDoc} from "@/types/types.ts";
import {useCreateTypeDoc, useUpdateTypeDoc} from "@/services/api/type-docs/type-docs.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    picked?: TypeDoc
}

const DocTypesModal: FC<IProps> = ({isShow, onClose, picked}) => {
    const [form] = Form.useForm<TypeDoc>();
    const {mutateAsync: createTypeDoc} = useCreateTypeDoc();
    const {mutateAsync: updateTypeDoc} = useUpdateTypeDoc();

    const onSubmit = async (values: Partial<TypeDoc>) => {
        const payload: Partial<TypeDoc> = {
            type_doc: values.type_doc ?? "",
        };

        if (picked) {
            await updateTypeDoc({type_doc_id: picked.type_doc_id, data: payload});
        } else {
            await createTypeDoc(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новый вид документа</span>
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
                               name={"type_doc"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите вид документа"
                                   }
                               ]}
                               label={"Вид документа"}>
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

export default DocTypesModal;
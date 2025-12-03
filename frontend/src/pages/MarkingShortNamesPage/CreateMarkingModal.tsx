import {Button, Form, Input, Modal} from "antd";
import type {FC} from "react";
import type {AbbreveBrand} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    picked?: AbbreveBrand
}

const CreateMarkingModal: FC<IProps> = ({isShow, onClose, picked}) => {
    const [form] = Form.useForm<AbbreveBrand>();

    // В бекенде пока нет POST/PUT для abbreve-brand, поэтому форма только отображает данные / подготавливается под будущее API
    const onSubmit = async () => {
        onClose();
        form.resetFields();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новое наименование</span>
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
                               name={"abbreve_brand"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите сокращенное наименование марки"
                                   }
                               ]}
                               label={"Сокращенное наименование марки"}>
                        <Input/>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"direction_e_violation"}
                               label={"Направление/вид нарушения"}>
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

export default CreateMarkingModal;
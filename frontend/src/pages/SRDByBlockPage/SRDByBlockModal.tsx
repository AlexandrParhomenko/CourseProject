import {Button, Form, Input, Modal} from "antd";
import type {FC} from "react";
import {roleStore} from "@/store/store.ts";
import {useCreateBlock, useUpdateBlock} from "@/services/api/blocks/blocks.ts";
import type {Block} from "@/types/types.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    picked?: Block
}

const SrdByBlockModal: FC<IProps> = ({isShow, onClose, picked}) => {
    const [form] = Form.useForm<Block>();
    const {role} = roleStore();
    const {mutateAsync: createBlock} = useCreateBlock();
    const {mutateAsync: updateBlock} = useUpdateBlock();

    const onSubmit = async (values: Partial<Block>) => {
        if (!role?.contract_id) return;

        const payload: Partial<Block> = {
            contract_id: role.contract_id,
            designation_block: values.designation_block ?? "",
            name_block: values.name_block ?? "",
            note_block: values.note_block ?? null,
        };

        if (picked) {
            await updateBlock({id: picked.block_id, data: payload});
        } else {
            await createBlock(payload);
        }

        form.resetFields();
        onClose();
    };

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новая запись</span>
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
                               name={"designation_block"}
                               label={"Обозначение блока"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"name_block"}
                               label={"Наименование блока"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item className={"w-full"}
                               name={"note_block"}
                               label={"Примечание"}>
                        <Input></Input>
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

export default SrdByBlockModal;
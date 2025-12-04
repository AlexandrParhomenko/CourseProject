import {Button, Form, Input, Modal, message} from "antd";
import type {FC} from "react";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateBlock} from "@/services/api/blocks/blocks.ts";
import type {Block} from "@/types/types.ts";

interface IProps {
  isShow: boolean
  onClose: () => void
  picked?: Block
}

const SrdByBlockModal: FC<IProps> = ({isShow, onClose, picked}) => {
  const [form] = Form.useForm<Block>();
  const [messageApi, contextHolder] = message.useMessage();
  const {role} = roleStore();
  const {user} = useUserStore()
  const {mutateAsync: createBlock} = useCreateBlock();

  const onSubmit = async (values: Partial<Block>) => {
    if (!role?.contract_id) return;

    const payload: Partial<Block> = {
      contract_id: role.contract_id,
      designation_block: values.designation_block ?? "",
      name_block: values.name_block ?? "",
      note_block: values.note_block ?? null,
      create_row_user_id: user?.user_id
    };

    try {
      await createBlock(payload);
      form.resetFields();
      onClose();
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "Не удалось сохранить блок СРД. Повторите попытку позже"
      });
    }
  };

  return (
    <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
      <div className={"flex items-center flex-col justifycenter"}>
        {contextHolder}
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
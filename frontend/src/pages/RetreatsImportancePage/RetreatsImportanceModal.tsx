import {Button, Form, Input, Modal, message} from "antd";
import type {FC} from "react";
import type {Defect} from "@/types/types.ts";
import {useCreateDefect} from "@/services/api/defects/defects.ts";
import {useUserStore} from "@/store/store.ts";

interface IProps {
  isShow: boolean
  onClose: () => void
  picked?: Defect
}

const RetreatsImportanceModal: FC<IProps> = ({isShow, onClose, picked}) => {
  const [form] = Form.useForm<Defect>();
  const {user} = useUserStore()
  const [messageApi, contextHolder] = message.useMessage();
  const {mutateAsync: createDefect} = useCreateDefect();

  const onSubmit = async (values: Partial<Defect>) => {
    const payload: Partial<Defect> = {
      importance_defect: values.importance_defect ?? "",
      create_row_user_id: user?.user_id
    };

    try {
      await createDefect(payload);
      form.resetFields();
      onClose();
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "Не удалось сохранить значимость. Повторите попытку позже"
      });
    }
  };

  return (
    <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
      <div className={"flex items-center flex-col justify-center"}>
        {contextHolder}
        <span className={"font-bold"}>Новая значимость</span>
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
                     name={"importance_defect"}
                     rules={[
                       {
                         required: true,
                         message: "Введите значимость"
                       }
                     ]}
                     label={"Значимость отступления, нарушения"}>
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

export default RetreatsImportanceModal;
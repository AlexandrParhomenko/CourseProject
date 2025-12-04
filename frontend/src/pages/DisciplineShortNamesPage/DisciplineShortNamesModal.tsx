import {Button, Form, Input, Modal, message} from "antd";
import type {FC} from "react";
import {useCreateDiscipline} from "@/services/api/disciplines/disciplines.ts";
import type {Discipline} from "@/types/types.ts";
import {useUserStore} from "@/store/store.ts";

interface IProps {
  isShow: boolean
  onClose: () => void
  picked?: Discipline
}

const DisciplineShortNamesModal: FC<IProps> = ({isShow, onClose, picked}) => {
  const [form] = Form.useForm<Discipline>();
  const {user} = useUserStore()
  const [messageApi, contextHolder] = message.useMessage();
  const {mutateAsync: createDiscipline} = useCreateDiscipline();

  const onSubmit = async (values: Partial<Discipline>) => {
    const payload: Partial<Discipline> = {
      discipline: values.discipline ?? "",
      create_row_user_id: user?.user_id,
    };

    try {
      await createDiscipline(payload);
      form.resetFields();
      onClose();
    } catch (e) {
      messageApi.open({
        type: "error",
        content: "Не удалось сохранить дисциплину. Повторите попытку позже"
      });
    }
  };

  return (
    <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
      <div className={"flex items-center flex-col justify-center"}>
        {contextHolder}
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
                     name={"discipline"}
                     rules={[
                       {
                         required: true,
                         message: "Введите шифр дисциплины"
                       }
                     ]}
                     label={"Шифр дисциплины"}>
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

export default DisciplineShortNamesModal;
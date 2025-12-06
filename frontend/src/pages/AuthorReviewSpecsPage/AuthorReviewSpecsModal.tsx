import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateSpecialist, useUpdateSpecialist} from "@/services/api/specialists/specialists.ts";
import type {Specialist} from "@/types/types.ts";
import {useGetAllTypeWorks} from "@/services/api/type-works/type-works.ts";
import {useGetAllContracts} from "@/services/api/contracts/contracts.ts";
import dayjs from "dayjs";

interface IProps {
  isShow: boolean
  onClose: () => void
  type: ModalType
  picked?: Specialist
}

const AuthorReviewSpecsModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
  const [form] = Form.useForm();
  const {role} = roleStore();
  const {user} = useUserStore();
  const {mutateAsync: createSpecialist, isPending: isCreateLoading} = useCreateSpecialist();
  const {mutateAsync: updateSpecialist, isPending: isUpdateLoading} = useUpdateSpecialist();
  const {data} = useGetAllTypeWorks()
  const {data: contracts} = useGetAllContracts()
  const onSubmit = async (values: Partial<Specialist>) => {
    if (!role?.contract_id) return;

    const payload: Partial<Specialist> = {
      contract_id: role.contract_id,
      fullname: values.fullname ?? "",
      post_specialist: values.post_specialist ?? "",
      phone_number: values.phone_number ?? "",
      number_doc: Number(values.number_doc) || 0,
      date_doc: values.date_doc!,
      type_work: values.type_work,
      create_row_user_id: user?.user_id,
    };

    if (type === "update" && picked) {
      await updateSpecialist({id: picked.specialist_id, data: payload});
    } else {
      await createSpecialist(payload);
    }

    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (picked && type === "update") {
      form.setFieldsValue({
        contract_number: picked.contract?.number_contract,
        fullname: picked.fullname,
        post_specialist: picked.post_specialist,
        phone_number: picked.phone_number,
        type_work: picked.type_work,
        number_doc: picked.number_doc,
        date_doc: picked.date_doc ? dayjs(picked.date_doc) : null,
      })
    }
  }, [picked]);

  return (
    <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => {
      form.resetFields()
      onClose()
    }} open={isShow}>
      <div className={"flex items-center flex-col justify-center"}>
        <span className={"font-bold"}>Запись реестра специалистов авторского надзора</span>
        <Form
          form={form}
          scrollToFirstError={{
            behavior: "smooth",
            block: "center",
            inline: "center"
          }}
          className={"flex items-center flex-col w-full"}
          onFinish={onSubmit}
          layout={"vertical"}
        >
          <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
            <Form.Item className={"w-full"}
                       name={"contract_number"}
                       label={"Номер договора"}>
              <Select
                placeholder={"Введите номер договора"}
                allowClear>
                {contracts && contracts.map((el, idx) => <Select.Option key={idx}
                                                                        value={el.contract_id}>{el.number_contract}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"fullname"}
                       rules={[
                         {
                           required: true,
                           message: "Введите ФИО"
                         }
                       ]}
                       label={"ФИО"}>
              <Input placeholder={"Введите ФИО"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"post_specialist"}
                       rules={[
                         {
                           required: true,
                           message: "Выберите должность"
                         }
                       ]}
                       label={"Должность"}>
              <Select placeholder={"Выберите должность"}>
                <Select.Option value={"Начальник ОНС"}>Начальник ОНС</Select.Option>
                <Select.Option value={"Ведущий инженер"}>Ведущий инженер</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"phone_number"}
                       rules={[
                         {
                           required: true,
                           message: "Введите номер телефона"
                         }
                       ]}
                       label={"Номер телефона"}>
              <Input placeholder={"Введите номер телефона"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"type_work"}
                       rules={[
                         {
                           required: true,
                           message: "Выберите вид работы"
                         }
                       ]}
                       label={"Вид работы, по которой осуществляется авторский надзор"}>
              <Select
                placeholder={"Выберите вид работы"}
                allowClear>
                {data && data.map((el, idx) => <Select.Option key={idx}
                                                              value={el.name_work}>{el.name_work}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"number_doc"}
                       rules={[
                         {
                           required: true,
                           message: "Введите номер документа Приказ №"
                         }
                       ]}
                       label={"Номер документа Приказ №____"}>
              <Input type={"number"} placeholder={"Введите номер приказа"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"date_doc"}
                       rules={[
                         {
                           required: true,
                           message: "Введите дату документа о полномочиях"
                         }
                       ]}
                       label={"Дата документа о полномочиях. Приказ от ______"}>
              <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
            <Button htmlType="submit" loading={isCreateLoading || isUpdateLoading}>Сохранить</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AuthorReviewSpecsModal;












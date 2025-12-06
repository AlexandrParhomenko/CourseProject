import {Button, DatePicker, Form, Input, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateRegistry, useUpdateRegistry} from "@/services/api/registry/registry.ts";
import type {Registry} from "@/types/types.ts";
import {useGetBrandsByContractId} from "@/services/api/brands/brands.ts";
import {useGetAllTypeWorks} from "@/services/api/type-works/type-works.ts";
import {useGetAllTypeDocs} from "@/services/api/type-docs/type-docs.ts";
import dayjs from "dayjs";

interface IProps {
  isShow: boolean
  onClose: () => void
  type: ModalType
  picked?: Registry
}

const IDTRegistryModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
  const [form] = Form.useForm();
  const {role} = roleStore();
  const {user} = useUserStore();
  const {mutateAsync: createRegistry, isPending: isCreateLoading} = useCreateRegistry();
  const {mutateAsync: updateRegistry, isPending: isUpdateLoading} = useUpdateRegistry();
  const {data: brands} = useGetBrandsByContractId(role?.contract_id);
  const {data: typeWorks} = useGetAllTypeWorks();
  const {data: typeDocs} = useGetAllTypeDocs();
  const onSubmit = async (values: Partial<Registry>) => {
    if (!role?.contract_id) return;
    const payload: Partial<Registry> = {
      contract_id: role.contract_id,
      type_work: values.type_work,
      type_doc_id: values.type_doc_id,
      brand_id: values.brand_id,
      date_of_review: values.date_of_review,
      date_signing_doc: values.date_signing_doc,
      path_to_doc_signed: values.path_to_doc_signed,
      path_to_doc_with_note: values.path_to_doc_with_note,
      create_row_user_id: user?.user_id,
    };

    if (type === "update" && picked) {
      await updateRegistry({registry_id: picked.registry_id, data: payload});
    } else {
      await createRegistry(payload);
    }
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (isShow && picked && type === "update") {
      form.setFieldsValue({
        brand_id: picked.brand_id,
        type_work: picked.type_work,
        type_doc_id: picked.type_doc_id,
        path_to_doc_signed: picked.path_to_doc_signed,
        path_to_doc_with_note: picked.path_to_doc_with_note,
        date_of_review: dayjs(picked.date_of_review),
        date_signing_doc: dayjs(picked.date_signing_doc),
      })
    }
  }, [isShow]);

  return (
    <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => {
      form.resetFields();
      onClose();
    }} open={isShow}>
      <div className={"flex items-center flex-col justify-center"}>
        <span className={"font-bold"}>Запись реестра ИТД</span>
        <Form
          form={form}
          scrollToFirstError={{
            behavior: "smooth",
            block: "center",
            inline: "center"
          }}
          className={"flex items-center flex-col w-full"}
          onFinish={onSubmit}
          layout={"vertical"}>
          <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
            <Form.Item className={"w-full"}
                       name={"brand_id"}
                       rules={[
                         {
                           required: true,
                           message: "Выберите марку РД"
                         }
                       ]}
                       label={"Марка РД, которой соответствует ИТД"}>
              <Select>
                {brands && brands.map((el, idx) => <Select.Option key={idx} value={el.brand_id}>{el.name_brand}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"type_work"}
                       rules={[
                         {
                           required: true,
                           message: "Выберите вид работ"
                         }
                       ]}
                       label={"Вид работ"}>
              <Select>
                {typeWorks && typeWorks.map((el, idx) => <Select.Option key={idx} value={el.type_work}>{el.type_work}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"type_doc_id"}
                       rules={[
                         {
                           required: true,
                           message: "Выберите вид документа"
                         }
                       ]}
                       label={"Вид документа в составе ИТД (АОК, АОСР, ...)"}>
              <Select>
                {typeDocs && typeDocs.map((el, idx) => <Select.Option key={idx} value={el.type_doc_id}>{el.type_doc}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"date_of_review"}
                       rules={[
                         {
                           required: true,
                           message: "Введите дату передачи"
                         }
                       ]}
                       label={"Передача на рассмотрение в ПАО \"ОНХП\""}>
              <DatePicker format={"DD.MM.YYYY"} className={"w-full"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"date_signing_doc"}
                       label={"Подписание документа представителем ПАО \"ОНХП\""}>
              <DatePicker format={"DD.MM.YYYY"} className={"w-full"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"path_to_doc_signed"}
                       label={"Гиперссылка на документ с подписью представителя АН ПАО \"ОНХП\" (при наличии)"}>
              <Input placeholder={"Введите гиперссылку"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"path_to_doc_with_note"}
                       label={"Гиперссылка на документ с замечаниями представителя АН ПАО \"ОНХП\" (при наличии)"}>
              <Input placeholder={"Введите гиперссылку"}/>
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

export default IDTRegistryModal;



import {Button, DatePicker, Form, Modal, Select} from "antd";
import {type FC, useEffect} from "react";
import type {ModalType} from "@typings/types.ts";
import {roleStore, useUserStore} from "@/store/store.ts";
import {useCreateVisitSheet, useUpdateVisitSheet} from "@/services/api/visit-sheets/visit-sheets.ts";
import type {VisitSheet} from "@/types/types.ts";
import dayjs from "dayjs";
import {
  useGetOrganizationContactsByContractId
} from "@/services/api/organization-contact-person/organization-contact-person.ts";
import {useGetSpecialistsByContractId} from "@/services/api/specialists/specialists.ts";

interface IProps {
  isShow: boolean
  onClose: () => void
  type: ModalType
  picked?: VisitSheet
}

const RegVisitListModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
  const [form] = Form.useForm();
  const {role} = roleStore();
  const {user} = useUserStore();
  const {mutateAsync: createVisitSheet} = useCreateVisitSheet();
  const {mutateAsync: updateVisitSheet} = useUpdateVisitSheet();
  const {data: listSpecs} = useGetOrganizationContactsByContractId(role?.contract_id);
  const {data: specs} = useGetSpecialistsByContractId(role?.contract_id);
  const onSubmit = async (values: Partial<VisitSheet>) => {
    if (!role?.contract_id) return;
    const payload: Partial<VisitSheet> = {
      contract_id: role.contract_id,
      specialist_id: values.specialist_id,
      date_arrival: dayjs(values.date_arrival).format('YYYY-MM-DD'),
      date_departure: dayjs(values.date_departure).format('YYYY-MM-DD'),
      create_row_user_id: user?.user_id,
    };

    if (type === "update" && picked) {
      await updateVisitSheet({id: picked.visit_sheet_id, data: payload});
    } else {
      await createVisitSheet(payload);
    }

    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (isShow && type === "update" && picked) {
      form.setFieldsValue({
        specialist_id: picked.specialist_id,
        date_arrival: dayjs(picked.date_arrival),
        date_departure: dayjs(picked.date_departure),
        contact_persons: picked.visit_sheet_ocps.map(el => el.organization_contact_person_id),
      })
    }
  }, [isShow]);

  return (
    <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => {
      form.resetFields()
      onClose()
    }} open={isShow}>
      <div className={"flex items-center flex-col justify-center"}>
        <span className={"font-bold"}>Запись регистрационного листа посещения объекта</span>
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
          <div className={"overflow-y-auto w-full"}>
            <Form.Item className={"w-full"}
                       name={"specialist_id"}
                       rules={[
                         {
                           required: true,
                           message: "Введите ФИО"
                         }
                       ]}
                       label={"ФИО"}>
              <Select>
                {specs && specs.map((el, idx) => <Select.Option
                  value={el.specialist_id} key={idx}>
                  {el.fullname}
                </Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"date_arrival"}
                       rules={[
                         {
                           required: true,
                           message: "Введите дату приезда"
                         }
                       ]}
                       label={"Дата приезда"}>
              <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"date_departure"}
                       rules={[
                         {
                           required: true,
                           message: "Введите дату отъезда"
                         }
                       ]}
                       label={"Дата отъезда"}>
              <DatePicker className={"w-full"} format={"DD.MM.YYYY"}/>
            </Form.Item>
            <Form.Item className={"w-full"}
                       name={"contact_persons"}
                       label={"Контактирующие лица"}>
              <Select
                mode="multiple"
                placeholder={"Выберите контактирующие лица"}
                allowClear>
                {listSpecs && listSpecs.map((el, idx) => <Select.Option
                  value={el.organization_contact_person_id} key={idx}>
                  {el.fullname}
                </Select.Option>)}
              </Select>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type={"link"} className={"mr-2"} onClick={onClose}>Отменить</Button>
            <Button htmlType="submit">Сохранить</Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default RegVisitListModal;












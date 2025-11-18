import {Button, DatePicker, Form, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const SupervisionJournalModal: FC<IProps> = ({isShow, onClose, type}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись журнала</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit} layout={"vertical"}>
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
                        {type === "update" && <Form.Item className={"w-full"}
                                    name={"user_login"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Введите дату"
                                        }
                                    ]}
                                    label={"Дата"}>
                            <DatePicker/>
                        </Form.Item>}
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите объект"
                                       }
                                   ]}
                                   label={"Номер объекта"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Титул"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Дисциплина"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Марка РД"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Секция"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Подсекция"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Выявленные отступления от проектной документации, нарушения требований технических регламентов, стандартов, сводов правил"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Указания об устранении выявленных отступлений или нарушений и сроки их выполнения, согласованные с заказчиком"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Значимость отступления, нарушения"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Ф.И.О. специалиста авторского надзора, выполнившего запись в журнале АН"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Срок устранения отступлений, дефектов, нарушений"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Организация, ответственная за устранение отступлений, дефектов, нарушений"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Отметка о выполнении указаний"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Дата выполнения указаний"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Гиперссылка на фото/чертеж авторского надзора"}>
                            <Select></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"user_login"}
                                   label={"Дата последнего изменения записи"}>
                            <Select></Select>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={() => {
                            onClose()
                        }}>Отменить</Button>
                        <Button htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default SupervisionJournalModal;
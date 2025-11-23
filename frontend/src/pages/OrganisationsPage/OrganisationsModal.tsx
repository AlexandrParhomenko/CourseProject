import {Button, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@typings/types.ts";

interface IProps {
    isShow: boolean
    onClose: Function
    type: ModalType
}

const OrganisationsModal: FC<IProps> = ({isShow, onClose, type}) => {
    const onSubmit = () => {

    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Запись реестра организаций</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit} layout={"vertical"}>
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"contract_number"}
                                   label={"Номер договора"}>
                            <Input placeholder={"Введите номер договора"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"project_participant"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите участника проекта"
                                       }
                                   ]}
                                   label={"Участник проекта"}>
                            <Select placeholder={"Выберите участника проекта"}></Select>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"organisation"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите организацию"
                                       }
                                   ]}
                                   label={"Организация"}>
                            <Input placeholder={"Введите организацию"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"contact_fio"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите ФИО контактного лица"
                                       }
                                   ]}
                                   label={"ФИО контактного лица"}>
                            <Input placeholder={"Введите ФИО контактного лица"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"position"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите должность"
                                       }
                                   ]}
                                   label={"Должность"}>
                            <Input placeholder={"Введите должность"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"department"}
                                   label={"Подразделение"}>
                            <Input placeholder={"Введите подразделение"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"contact_number"}
                                   label={"Контактный номер"}>
                            <Input placeholder={"Введите контактный номер"}/>
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

export default OrganisationsModal;







import {Button, Form, Input, Modal} from "antd";
import {type FC, useEffect} from "react";
import {useCreateContract} from "@/services/api/contracts/contracts.ts";
import {useUserStore} from "@/store/store.ts";

interface IProps {
    isShow: boolean
    onClose: Function
}

const CreateContractModal: FC<IProps> = ({isShow, onClose}) => {
    const {user} = useUserStore()
    const {mutate: createContract, isPending, data} = useCreateContract()
    const onSubmit = (values: {number_contract: string}) => {
        createContract({
            create_row_user_id: user?.user_id,
            number_contract: values.number_contract
        })
    }

    useEffect(() => {
        if (data) {
            onClose()
        }
    }, [data]);

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={() => onClose()} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>Новый договор</span>
                <Form scrollToFirstError={{
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                }} className={"flex items-center flex-col w-full"} onFinish={onSubmit}
                      layout={"vertical"}>
                    <Form.Item className={"w-full"}
                               name={"number_contract"}
                               rules={[
                                   {
                                       required: true,
                                       message: "Введите номер договора"
                                   }
                               ]}
                               label={"Номер договора"}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type={"link"} className={"mr-2"} onClick={() => {
                            onClose()
                        }}>Отменить</Button>
                        <Button loading={isPending} htmlType="submit">Сохранить</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default CreateContractModal;
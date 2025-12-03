import {Button, Form, Input, Modal, Select} from "antd";
import type {FC} from "react";
import type {ModalType} from "@/types/types.ts";
import type {Brand} from "@/types/types.ts";
import {roleStore} from "@/store/store.ts";
import {useCreateBrand, useUpdateBrand} from "@/services/api/brands/brands.ts";
import {useGetObjectsByContractId} from "@/services/api/objects/objects.ts";
import {useGetAllDisciplines} from "@/services/api/disciplines/disciplines.ts";
import {useGetAllAbbreveBrands} from "@/services/api/abbreve-brand/abbreve-brand.ts";
import {useGetBlocksByContractId} from "@/services/api/blocks/blocks.ts";

interface IProps {
    isShow: boolean
    onClose: () => void
    type: ModalType
    picked?: Brand
}

const SrdMarkingModal: FC<IProps> = ({isShow, onClose, type, picked}) => {
    const [form] = Form.useForm<Brand>();
    const {role} = roleStore();
    const {mutateAsync: createBrand} = useCreateBrand();
    const {mutateAsync: updateBrand} = useUpdateBrand();
    
    const {data: objects} = useGetObjectsByContractId(role?.contract_id);
    const {data: disciplines} = useGetAllDisciplines();
    const {data: abbreveBrands} = useGetAllAbbreveBrands();
    const {data: blocks} = useGetBlocksByContractId(role?.contract_id);

    const isUpdate = type === "update" && picked;

    const onSubmit = async (values: Partial<Brand>) => {
        if (!role?.contract_id) return;

        const payload: Partial<Brand> = {
            contract_id: role.contract_id,
            object_id: values.object_id ?? 0,
            title: values.title ?? "",
            discipline_id: values.discipline_id ?? 0,
            abbreve_brand_id: values.abbreve_brand_id ?? null,
            sections: values.sections ?? null,
            subsection: values.subsection ?? null,
            name_brand: values.name_brand ?? null,
            note: values.note ?? null,
            block_id: values.block_id ?? null,
        };

        if (isUpdate && picked) {
            await updateBrand({
                brand_id: picked.brand_id,
                data: payload
            });
        } else {
            await createBrand(payload);
        }

        form.resetFields();
        onClose();
    }

    return (
        <Modal width={"40%"} footer={false} destroyOnHidden centered onCancel={onClose} open={isShow}>
            <div className={"flex items-center flex-col justify-center"}>
                <span className={"font-bold"}>{isUpdate ? "Редактирование марки" : "Новая марка"}</span>
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
                    <div style={{height: "50vh"}} className={"overflow-y-auto w-full"}>
                        <Form.Item className={"w-full"}
                                   name={"contract_number"}
                                   label={"Номер договора"}
                                   initialValue={role?.contract.number_contract}>
                            <Input disabled placeholder={"Номер договора"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"object_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите объект"
                                       }
                                   ]}
                                   label={"Номер объекта"}>
                            <Select
                                placeholder={"Выберите объект"}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={objects?.map(obj => ({
                                    value: obj.object_id,
                                    label: `${obj.number_object} - ${obj.abbreve_name_object || obj.full_name_object}`
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"title"}
                                   label={"Титул"}>
                            <Input placeholder={"Введите титул"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"discipline_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите дисциплину"
                                       }
                                   ]}
                                   label={"Дисциплина"}>
                            <Select
                                placeholder={"Выберите дисциплину"}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={disciplines?.map(disc => ({
                                    value: disc.discipline_id,
                                    label: disc.discipline
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"abbreve_brand_id"}
                                   label={"Марка РД"}>
                            <Select
                                placeholder={"Выберите марку РД"}
                                allowClear
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={abbreveBrands?.map(brand => ({
                                    value: brand.abbreve_brand_id,
                                    label: brand.abbreve_brand
                                }))}
                            />
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"sections"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Введите секцию"
                                       }
                                   ]}
                                   label={"Секция"}>
                            <Input placeholder={"Введите секцию"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"subsection"}
                                   label={"Подсекция"}>
                            <Input placeholder={"Введите подсекцию"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"name_brand"}
                                   label={"Наименование марки"}>
                            <Input placeholder={"Введите наименование марки"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"note"}
                                   label={"Примечание"}>
                            <Input placeholder={"Введите примечание"}/>
                        </Form.Item>
                        <Form.Item className={"w-full"}
                                   name={"block_id"}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Выберите блок СРД"
                                       }
                                   ]}
                                   label={"Блок СРД"}>
                            <Select
                                placeholder={"Выберите блок СРД"}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={blocks?.map(block => ({
                                    value: block.block_id,
                                    label: `${block.designation_block} - ${block.name_block}`
                                }))}
                            />
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

export default SrdMarkingModal;
import type {TableColumnsType} from "antd";

export const itdRegistry: TableColumnsType<any> = [
    {
        width: 20,
        align: "center",
        title: '№',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        align: "center",
        title: 'Марка РД, которой соответствует ИТД',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        align: "center",
        title: 'Вид работ',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        align: "center",
        title: 'Вид документа в составе ИТД (АОК, АОСР, ...)',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        align: "center",
        title: 'Даты работы с документом',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
        children: [
            {
                align: "center",
                title: 'Передача на рассмотрение в ПАО "ОНХП"',
                dataIndex: 'dr_school_sname',
                key: 'dr_school_sname',
            },
            {
                align: "center",
                title: 'Подписание документа представителем ПАО "ОНХП"',
                dataIndex: 'dr_school_sname',
                key: 'dr_school_sname',
            }
        ]
    },
    {
        align: "center",
        title: 'Гиперссылка на документ с подписью представителя АН ПАО "ОНХП" (при наличии)',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        align: "center",
        title: 'Гиперссылка на документ с замечаниями представителя АН ПАО "ОНХП" (при наличии)',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    }
]

export const supervisionJournalColumns = [
    {
        width: 20,
        align: "center",
        title: '№',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        width: 150,
        align: "center",
        title: 'Дата',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 150,
        align: "center",
        title: 'Сокращенное наименование объекта',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 150,
        align: "center",
        title: 'Объект',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 150,
        align: "center",
        title: 'Титул',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 150,
        align: "center",
        title: 'Дисциплина',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 100,
        align: "center",
        title: 'Марка РД',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 100,
        align: "center",
        title: 'Секция',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Подсекция',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Выявленные отступления от проектной документации, нарушения требований технических регламентов, стандартов, сводов правил',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Указания об устранении выявленных отступлений или нарушений и сроки их выполнения, согласованные с заказчиком',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Значимость отступления, нарушения',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Ф.И.О. специалиста авторского надзора, выполнившего запись в журнале АН',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Срок устранения отступлений, дефектов, нарушений',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Организация, ответственная за устранение отступлений, дефектов, нарушений',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Отметка о выполнении указаний',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Дата выполнения указаний',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        align: "center",
        title: 'Гиперссылка на фото/чертеж авторского надзора',
        dataIndex: 'phone1',
        key: 'phone1'
    },
    {
        width: 150,
        align: "center",
        title: 'Дата последнего изменения записи',
        dataIndex: 'phone1',
        key: 'phone1'
    }
]

export const retreatsImportanceColumns = [
    {
        width: 100,
        align: "center",
        title: '№',
        dataIndex: 'dr_school_sname',
        key: 'dr_school_sname',
    },
    {
        align: "center",
        title: 'Значимость отступления, нарушения',
        dataIndex: 'phone1',
        key: 'phone1'
    }
]
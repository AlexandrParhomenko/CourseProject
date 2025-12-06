import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Flex, Table} from "antd";
import ContractsModal from "../JournalListsPage/ContractsModal.tsx";
import BackBtn from "../../components/BackBtn/BackBtn.tsx";
import routes from "../../router/routes.ts";
import type {ColumnType} from "antd/es/table";
import TableHeader from "../../components/TableHeader/TableHeader.tsx";
import CreateObjectModal from "./CreateObjectModal.tsx";
import ExitBtn from "@components/ExitBtn/ExitBtn.tsx";
import {useDeleteObject, useGetObjectsByContractId} from "@/services/api/objects/objects.ts";
import {roleStore} from "@/store/store.ts";
import type {Object} from "@/types/types.ts";

const BuildingObjectsPage = () => {
  document.title = "Объекты строительства";
  const navigate = useNavigate();
  const [showContracts, setShowContracts] = useState<boolean>(false);
  const [isCreateObject, setIsCreateObject] = useState<boolean>(false);
  const [pickedObject, setPickedObject] = useState<Object>({} as Object);
  const {role} = roleStore();
  const {data, isLoading, refetch} = useGetObjectsByContractId(role?.contract_id);
  const {mutateAsync: deleteObject, isError: isDeleteError} = useDeleteObject();
  const columns: ColumnType<Object>[] = [
    {
      width: 100,
      align: "center",
      title: '№',
      dataIndex: 'key',
      key: 'key',
    },
    {
      align: "center",
      title: 'Номер договора',
      dataIndex: 'phone1',
      key: 'phone1',
      render: (_: any, record) => {
        return (
          <div>{record.contract.number_contract}</div>
        )
      }
    },
    {
      align: "center",
      title: 'Номер объекта',
      dataIndex: 'number_object',
      key: 'number_object'
    },
    {
      align: "center",
      title: 'Сокращенное наименование объекта',
      dataIndex: 'abbreve_name_object',
      key: 'abbreve_name_object'
    },
    {
      align: "center",
      title: 'Полное наименование объекта',
      dataIndex: 'full_name_object',
      key: 'full_name_object'
    }
  ]

  const onRow = (record: Object) => {
    return {
      onChange: () => {
        setPickedObject(record);
      }
    };
  };
  return (
    <Flex vertical align={"center"} gap={20} className={"h-screen w-full"}>
      <ContractsModal isShow={showContracts} onClose={() => setShowContracts(false)}/>
      <div className={"flex justify-between w-full p-6"}>
        <BackBtn onClick={() => navigate(routes.journal_lists)}/>
        <span className={"font-bold"}>Объекты строительства</span>
        <ExitBtn/>
      </div>
      <div className={"w-full p-6"}>
        <TableHeader handleModalOpen={() => setIsCreateObject(true)}
                     btnName={"Новая запись"}
                     refetch={() => refetch()}
                     pickedPerson={"object"}
                     id={pickedObject.object_id}
                     deleteFunc={async () => {
                       if (!role?.contract_id) return;
                       if (!pickedObject.object_id) return;
                       await deleteObject({id: pickedObject.object_id, contract_id: role.contract_id});
                     }}
                     deleteFuncError={isDeleteError}
                     pickedRow={pickedObject ?? undefined}
                     setPickedRow={setPickedObject}
                     children={
                       <CreateObjectModal
                         onClose={() => setIsCreateObject(false)}
                         isShow={isCreateObject}
                       />
                     }
                     deleteEntity={"объект"} pickedEntity={pickedObject.number_object}/>
        <Table
          onRow={(record) => onRow(record)}
          rowSelection={{type: "radio"}}
          pagination={{ position: ["bottomCenter"], defaultPageSize: 25 }}
          loading={isLoading}
          scroll={{ y: "58vh" }}
          dataSource={data && data.map((el, idx) => ({...el, key: idx + 1}))}
          summary={() => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  <Table.Summary.Cell align={"center"} index={2}>Всего: {data ? data.length : 0}</Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
          columns={columns}/>
      </div>
    </Flex>
  );
};

export default BuildingObjectsPage;
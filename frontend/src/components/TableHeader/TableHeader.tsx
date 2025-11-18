import React, {type ReactNode, useEffect, useState} from "react";
import { Button, message, Popover, Tooltip } from "antd";
import { FiRefreshCw } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";

type ModalProps = {
  children?: ReactNode
  handleModalOpen: React.MouseEventHandler<HTMLDivElement>
  btnName: string
  refetch: React.MouseEventHandler<HTMLButtonElement>
  pickedPerson: string
  id: any
  customComponent?: ReactNode
  deleteFunc: Function
  deleteFuncError: any
  pickedRow?: unknown
  contractsPage?: boolean
  setPickedRow?: Function
  btnDisabled?: boolean
  deleteHandler?: Function
  actionsDisabled?: boolean
  deleteEntity: string
  actionsElems?: ReactNode
  filterOps?: ReactNode
}

const CustomTableHeader = ({
                             children,
                             handleModalOpen,
                             btnName,
                             refetch,
                             pickedPerson,
                             id,
                             deleteFunc,
                             deleteFuncError,
                             deleteEntity,
                             setPickedRow,
                             btnDisabled,
                             actionsDisabled,
                             customComponent,
                             pickedRow,
                             deleteHandler,
                             contractsPage,
                             actionsElems,
                             filterOps
                           }: ModalProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const handleDeleteModalOpen = () => setIsDeleteModalOpen(true);
  const handleDeleteModalCancel = () => setIsDeleteModalOpen(false);
  const onClose = () => handleDeleteModalCancel();
  const onDelete = async () => {
    setPickedRow ? setPickedRow({}) : "";
    await deleteFunc(id);
    deleteHandler && deleteHandler()
    handleDeleteModalCancel();
  };

  const error500 = () => {
    messageApi.open({
      type: "error",
      content: "Что-то пошло не так. Повторите запрос позднее"
    });
  };

  useEffect(() => {
    if (deleteFuncError) {
      error500();
    }
  }, [deleteFuncError]);


  return (
    <div className={"flex w-full mb-2 rounded-lg px-5"}>
      {contextHolder}
      {children}
      <div className="flex items-center gap-2 w-full h-15">
        {btnDisabled ? "" : <div onClick={handleModalOpen} className="btn btn--action"><span>{btnName}</span></div>}
        <div className={"flex gap-1"}>
          <Tooltip title={"Обновить"} placement={"bottom"}>
            <Button onClick={refetch}><FiRefreshCw
              className="filterIcon__image" size={20} /></Button>
          </Tooltip>
          <Tooltip title={"Удалить"} placement={"bottom"}>
            <Button onClick={handleDeleteModalOpen} disabled={!id.id}
                    className="filterIcon"><RiDeleteBin6Line className="filterIcon__image" size={20} /></Button>
          </Tooltip>
        </div>
        {!actionsDisabled && actionsElems}
        {customComponent}
        {filterOps ? filterOps : <Popover trigger={"click"}
                                          content={<div>Нет доступных фильтров</div>}
                                          placement="bottom" onOpenChange={() => setOpenFilter(!openFilter)}
                                          open={openFilter}>
          <Tooltip title={"Фильтр"} placement={"bottom"}>
            <div className={"cursor-pointer flex items-center duration-300 hover:bg-gray-50 p-3 rounded-full"}>
              <FaFilter color={"#494949"} />
            </div>
          </Tooltip>
        </Popover>}
      </div>
    </div>
  );
};

export default CustomTableHeader;
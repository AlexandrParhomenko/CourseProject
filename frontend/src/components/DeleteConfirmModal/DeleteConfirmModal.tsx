import {Flex, Modal} from "antd";

interface CustomDeleteModalProps {
  pickedEntity: string
  isShow: boolean
  onClose: Function
  onDelete: Function
  deleteEntity: string
}

const DeleteConfirmModal = ({pickedEntity, onDelete, deleteEntity, isShow, onClose}: CustomDeleteModalProps) => {
  return (
    <Modal
      width={500}
      footer={false}
      destroyOnHidden
      centered
      onCancel={() => onClose()}
      open={isShow}>
      <div className="flex flex-col items-center gap-5 text-center pt-5">
        <span className="text-base text-gray-800">
          {`Вы действительно хотите удалить ${deleteEntity} ${pickedEntity}?`}
        </span>
        <Flex gap="middle" className="w-full justify-center">
          <button
            type="button"
            onClick={() => onClose()}
            className="
          px-4 py-2 cursor-pointer
          text-gray-600 border border-gray-300 rounded-lg
          hover:bg-gray-50 hover:border-gray-400
          active:bg-gray-100
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          font-medium text-sm
          focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1
          shadow-sm">
            Отмена
          </button>
          <button
            type="button"
            onClick={() => onDelete()}
            className="
          px-3 py-2 cursor-pointer
          bg-gradient-to-r from-red-500 to-red-600
          text-white border border-red-600 rounded-lg
          hover:from-red-600 hover:to-red-700
          hover:shadow-lg hover:shadow-red-200
          active:from-red-700 active:to-red-800
          active:scale-[0.98]
          disabled:opacity-70 disabled:cursor-wait
          transition-all duration-200
          font-medium text-sm
          focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1
          shadow-md
          flex items-center justify-center gap-2
          min-w-[100px]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Удалить
          </button>
        </Flex>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
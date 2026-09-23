import Modal from "../Modal";

const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  cancelText,
  confirmText,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">{description}</p>

        <div className="flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={!onConfirm}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

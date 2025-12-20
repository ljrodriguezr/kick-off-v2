import { Modal as AntModal } from 'antd';

const Modal = ({ open, onClose, children, ...rest }) => {
  return (
    <AntModal open={open} onCancel={onClose} footer={null} {...rest}>
      {children}
    </AntModal>
  );
};

export default Modal;

import { Modal, Button, Typography } from 'antd';

const { Text } = Typography;

const RecoverPasswordDialog = (props) => {
  return (
    <Modal
      title="Recuperación de contraseña"
      open={props.open}
      onCancel={props.onClose}
      footer={[
        <Button key="close" type="primary" onClick={props.onClose}>
          Cerrar
        </Button>,
      ]}
      width={500}
    >
      <Text>
        Se ha generado un enlace de recuperación y se ha enviado a su correo
        electrónico registrado, por favor acceda al enlace y siga los pasos
        indicados para recuperar su contraseña
      </Text>
    </Modal>
  );
};

export default RecoverPasswordDialog;

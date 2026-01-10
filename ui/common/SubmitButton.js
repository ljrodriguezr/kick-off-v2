import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const SubmitButton = ({ onClick, disabled }) => {
  return (
    <Button
      style={{ marginTop: 10 }}
      htmlType="submit"
      size="middle"
      block
      type="primary"
      onClick={onClick}
      disabled={disabled}
      icon={<SaveOutlined />}
    >
      Guardar
    </Button>
  );
};

export default SubmitButton;

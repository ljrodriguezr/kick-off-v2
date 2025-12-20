import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const CreateButton = ({ url, children, fullWidth = true, selector }) => {
  const router = useRouter();
  const access = useSelector(selector);
  if (!access.create) return <></>;

  return (
    <div style={{ width: fullWidth ? 150 : 'auto' }}>
      <Button
        type="primary"
        size="small"
        icon={<PlusOutlined />}
        onClick={() => router.push(url)}
        block={fullWidth}
      >
        {children || 'CREAR'}
      </Button>
    </div>
  );
};

export default CreateButton;

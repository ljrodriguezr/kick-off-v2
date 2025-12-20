import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const UpdateButton = ({ url, children, state = 'draft' }) => {
  const router = useRouter();

  return (
    <div style={{ width: 100 }}>
      <Button
        type="primary"
        size="small"
        icon={<EditOutlined />}
        onClick={() => router.push(url)}
        block
        disabled={state !== 'draft'}
      >
        {children || 'MODIFICAR'}
      </Button>
    </div>
  );
};

export default UpdateButton;

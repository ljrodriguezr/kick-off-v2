import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const UpdateButton = ({ url, children, state = 'draft' }) => {
  const router = useRouter();

  return (
    <div style={{ width: 100 }}>
      <Button
        size="small"
        icon={<EditOutlined />}
        onClick={() => router.push(url)}
        block
        disabled={state !== 'draft'}
        style={{
          background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)',
          borderColor: '#1677ff',
          color: '#ffffff',
          fontWeight: 500,
          borderRadius: 6,
          boxShadow: '0 2px 4px rgba(22, 119, 255, 0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, #4096ff 0%, #69b1ff 100%)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(22, 119, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(22, 119, 255, 0.3)';
        }}
      >
        {children || 'MODIFICAR'}
      </Button>
    </div>
  );
};

export default UpdateButton;

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
        size="small"
        icon={<PlusOutlined />}
        onClick={() => router.push(url)}
        block={fullWidth}
        style={{
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          borderColor: '#52c41a',
          color: '#ffffff',
          fontWeight: 500,
          borderRadius: 6,
          boxShadow: '0 2px 4px rgba(82, 196, 26, 0.3)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, #73d13d 0%, #95de64 100%)';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(82, 196, 26, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(82, 196, 26, 0.3)';
        }}
      >
        {children || 'CREAR'}
      </Button>
    </div>
  );
};

export default CreateButton;

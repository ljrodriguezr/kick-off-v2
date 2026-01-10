import { Spin } from 'antd';

const Loading = () => {
  return (
    <div
      style={{
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" style={{ color: 'white' }} />
    </div>
  );
};

export default Loading;

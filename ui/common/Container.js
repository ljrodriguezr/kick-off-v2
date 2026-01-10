import { Row } from 'antd';

const Container = ({ children }) => {
  return (
    <Row gutter={[8, 8]} justify="space-between" style={{ width: '100%' }}>
      {children}
    </Row>
  );
};

export default Container;

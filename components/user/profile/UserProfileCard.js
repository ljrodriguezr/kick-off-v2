import { Row, Col, Typography } from 'antd';

const { Text } = Typography;

const UserProfileCard = ({ user }) => {
  return (
    <Row gutter={[8, 8]}>
      <Col xs={24}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text strong style={{ fontSize: 16 }}>
            {user?.Person?.name}
          </Text>
          <Text strong style={{ fontSize: 14 }}>
            {user?.email}
          </Text>
        </div>
      </Col>
    </Row>
  );
};

export default UserProfileCard;

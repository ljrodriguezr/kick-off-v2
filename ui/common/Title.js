import { Row, Col, Typography } from 'antd';

const { Title: AntTitle } = Typography;

const Title = ({ children, title }) => {
  const leftSpan = children
    ? { xs: 16, sm: 20, lg: 20 }
    : { xs: 24, sm: 24, lg: 24 };
  const rightSpan = children
    ? { xs: 8, sm: 4, lg: 4 }
    : { xs: 0, sm: 0, lg: 0 };

  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      <Col xs={leftSpan.xs} sm={leftSpan.sm} lg={leftSpan.lg}>
        <AntTitle level={4} style={{ margin: 0 }}>
          {title || 'LISTA'}
        </AntTitle>
      </Col>
      {children && (
        <Col
          xs={rightSpan.xs}
          sm={rightSpan.sm}
          lg={rightSpan.lg}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {children}
        </Col>
      )}
    </Row>
  );
};

export default Title;

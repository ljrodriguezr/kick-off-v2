import { Row, Col, Alert } from 'antd';
import { dates } from '@lib/dates';

const UserProfileInfo = ({ user }) => {
  const createdDate = dates.toString(user?.createdDate);
  const lastPasswordDate = dates.toString(user?.lastPasswordDate);
  const dueDays = dates.dueDaysUntil(user?.lastPasswordDate, 180);

  const activeType = () => (user?.active ? 'success' : 'error');
  const activeLabel = () => (user?.active ? 'activada' : 'desactivada');

  const passwordChangeSeverity = () => {
    if (dueDays <= 1) return 'error';
    if (dueDays <= 5) return 'warning';
    return 'info';
  };

  const showDueDays = () => {
    return !['66050', '66048'].includes(user?.AccountType?.value);
  };

  return (
    <Row gutter={[16, 8]}>
      {!!user?.lastPasswordDate && showDueDays() && (
        <Col xs={24} style={{ paddingTop: 5 }}>
          <Alert
            type={passwordChangeSeverity()}
            message={
              <>
                Le quedan <strong>{dueDays}</strong>{' '}
                {dueDays === 1 ? 'día' : 'días'} para cambiar su contraseña
              </>
            }
          />
        </Col>
      )}
      {!showDueDays() && (
        <Col xs={24} style={{ paddingTop: 5 }}>
          <Alert type="info" message="Su contraseña nunca expira" />
        </Col>
      )}
      <Col xs={24} style={{ paddingTop: 5 }}>
        <Alert
          type={activeType()}
          message={`Su cuenta se encuentra ${activeLabel()}`}
        />
      </Col>
      <Col xs={24} style={{ paddingTop: 5 }}>
        <Alert
          type="info"
          message={`La cuenta ha sido creada en la fecha: ${createdDate}`}
        />
      </Col>
      <Col xs={24} style={{ paddingTop: 5 }}>
        <Alert
          type="info"
          message={`Su última actualización de contraseña se llevó a cabo el: ${lastPasswordDate}`}
        />
      </Col>
    </Row>
  );
};

export default UserProfileInfo;

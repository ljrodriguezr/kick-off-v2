import { Row, Col, Button, Space } from 'antd';
import Loading from '@ui/common/Loading';
import UserProfileCard from '@components/user/profile/UserProfileCard';
import UserProfileInfo from '@components/user/profile/UserProfileInfo';
import ChangePasswordDialog from '@components/user/password/ChangePasswordDialog';
import RecoverPasswordDialog from '../password/RecoverPasswordDialog';
import UserProfileLogo from '@components/user/profile/UserProfileLogo';
import Paper from '@ui/common/Paper';
import { useState } from 'react';
import { userService } from '@services/user.service';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';
import { authService } from '@services/auth.service';

const UserProfile = (props) => {
  const profile = props.profile;
  const [openChange, setOpenChange] = useState(false);
  const [openRecover, setOpenRecover] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenChange = () => setOpenChange(true);
  const handleCloseChange = () => setOpenChange(false);
  const handleOpenRecover = () => setOpenRecover(true);
  const handleCloseRecover = () => setOpenRecover(false);

  const recoverPassword = async () => {
    if (!loading) {
      setLoading(true);
      try {
        // TODO: Get user email from local storage
        const user = await authService.user();
        const response = await userService.recoverPasswordByEmail(user.email);
        handleOpenRecover();
        snackbar.success(
          enqueueSnackbar,
          `Enlace de recuperación generado y enviado a: ${response.message}`,
        );
      } catch (error) {
        snackbar.error(enqueueSnackbar, error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Row gutter={16} style={{ minHeight: 160 }}>
            <Col
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -9,
                maxHeight: 100,
              }}
            >
              <UserProfileLogo person={profile.Person} />
            </Col>
            <Col
              xs={12}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Paper>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <strong>Credenciales</strong>
                </div>
                <Space
                  direction="vertical"
                  style={{ width: '100%', paddingTop: 10 }}
                >
                  <Button type="primary" onClick={handleOpenChange} block>
                    Cambiar
                  </Button>
                  <Button type="primary" onClick={recoverPassword} block>
                    Recuperar
                  </Button>
                </Space>
              </Paper>
            </Col>
          </Row>
          <UserProfileCard user={profile} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <UserProfileInfo user={profile} />
        </Col>
      </Row>
      <ChangePasswordDialog open={openChange} onClose={handleCloseChange} />
      <RecoverPasswordDialog open={openRecover} onClose={handleCloseRecover} />
      {loading && <Loading />}
    </>
  );
};

export default UserProfile;

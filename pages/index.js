import { Row, Col } from 'antd';
import UserProfile from '@components/user/profile/UserProfile';
import Dashboard from '@ui/layout/Dashboard';
import Loading from '@ui/common/Loading';
import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';
import { authService } from '@services/auth.service';

const Home = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const load = useCallback(async () => {
    try {
      setUser(await authService.user());
    } catch (error) {
      snackbar.error(enqueueSnackbar, error);
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => load(), [load]);

  if (loading) return <Loading />;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={10} md={8} lg={6} xl={5}>
        <UserProfile profile={user} />
      </Col>
      <Col xs={24} sm={14} md={16} lg={18} xl={19}></Col>
      <Col xs={24}></Col>
    </Row>
  );
};

Home.propTypes = {};
Home.Layout = Dashboard;

export default Home;

import { Layout, Drawer, Button, Space, Row, Typography } from 'antd';
import { MenuOutlined, LeftOutlined } from '@ant-design/icons';
import UserSettingMenu from '@ui/layout/UserSettingMenu';
import SidebarList from '@ui/layout/SidebarList';
import AppBar from '@ui/layout/AppBar';
import DrawerHeader from '@ui/layout/DrawerHeader';
import Main from '@ui/layout/Main';
import Logo from '@ui/layout/Logo';
import { isMobile } from 'react-device-detect';
import { useRouter } from 'next/router';
import { authService } from '@services/auth.service';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { set } from '@redux/reducers/accessSlice';
import { set as setRoles } from '@redux/reducers/rolesSlice';
import { userService } from '@services/user.service';

const { Sider } = Layout;
const { Text } = Typography;

const drawerWidth = 260;

const Dashboard = (props) => {
  const [open, setOpen] = useState(!isMobile);
  const [user, setUser] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await authService.public.user();
        setUser(user);
        const access = await userService.getAccess();
        dispatch(set(access || {}));
        const roles = await userService.roles();
        dispatch(setRoles(roles || {}));
      } catch (error) {
        if (error === 'No autorizado' || error === 'Sesión caducada')
          return await router.replace('/auth/signin');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [dispatch, router]);

  const handleOpen = () => {
    isMobile ? setOpen(!open) : null;
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getCompanyName = () => {
    const name = user?.Institution?.name;
    return (name || 'Kick Off').toUpperCase();
  };

  const getCompanyIsologo = () => {
    return user?.Institution?.logo;
  };

  if (loading) return <></>;

  const siderContent = (
    <>
      <DrawerHeader>
        <Row justify="center">
          <Logo logo={getCompanyIsologo()} />
        </Row>
        <Row justify="center" style={{ marginTop: 6 }}>
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
            {getCompanyName()}
          </Text>
        </Row>
        {open && (
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handleDrawerClose}
            style={{ color: 'white' }}
          />
        )}
      </DrawerHeader>
      <div style={{ height: 64 }} />
      <SidebarList handleOpen={handleOpen} />
    </>
  );

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: '#f4f6fb',
        '--dashboard-header': '#1f3b68',
        '--dashboard-bg': '#f4f6fb',
      }}
    >
      <AppBar open={open}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={handleDrawerOpen}
              style={{ color: 'white' }}
            />
            <Text style={{ color: 'white', fontWeight: 600 }}>
              Dashboard
            </Text>
          </Space>
          <UserSettingMenu user={user} />
        </Space>
      </AppBar>

      {isMobile ? (
        <Drawer
          placement="left"
          onClose={handleDrawerClose}
          open={open}
          width={drawerWidth}
          bodyStyle={{ padding: 0 }}
        >
          {siderContent}
        </Drawer>
      ) : (
        <Sider
          width={drawerWidth}
          collapsed={!open}
          collapsedWidth={72}
          trigger={null}
          style={{
            background: '#fff',
            borderRight: '1px solid rgba(15, 35, 64, 0.08)',
          }}
        >
          {siderContent}
        </Sider>
      )}

      <Layout>
        <Main open={open}>
          {props.children}
        </Main>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

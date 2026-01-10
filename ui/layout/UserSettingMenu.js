import { Dropdown, Space, Avatar, Typography, Button } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { authService } from '@services/auth.service';
import styled from 'styled-components';

const { Text } = Typography;

const StyledButton = styled(Button)`
  color: white;
  border: none;
  height: 48px;
  border-radius: 14px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);

  &:hover {
    color: white !important;
    background: rgba(255, 255, 255, 0.18) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserSettingMenu = ({ user }) => {
  const router = useRouter();

  const signOut = async () => {
    try {
      await authService.signout();
      await router.replace('/auth/signin');
    } catch (error) {}
  };

  const items = [
    {
      key: 'profile',
      label: (
        <Space style={{ padding: '4px 0' }}>
          <UserOutlined style={{ fontSize: 16 }} />
          <span style={{ fontWeight: 500 }}>Mi Perfil</span>
        </Space>
      ),
      onClick: () => router.push('/'),
    },
    {
      key: 'settings',
      label: (
        <Space style={{ padding: '4px 0' }}>
          <SettingOutlined style={{ fontSize: 16 }} />
          <span style={{ fontWeight: 500 }}>Configuración</span>
        </Space>
      ),
      onClick: () => router.push('/'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <Space style={{ color: '#ef4444', padding: '4px 0' }}>
          <LogoutOutlined style={{ fontSize: 16 }} />
          <span style={{ fontWeight: 500 }}>Cerrar Sesión</span>
        </Space>
      ),
      onClick: signOut,
      danger: true,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={['click']}
      dropdownRender={(menu) => (
        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            padding: '8px 0',
            minWidth: 220,
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #f1f5f9',
              marginBottom: 8,
            }}
          >
            <Text strong style={{ fontSize: 14, color: '#1f2937' }}>
              {user.Person?.firstName} {user.Person?.lastName}
            </Text>
            <div style={{ marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {user.email}
              </Text>
            </div>
          </div>
          {menu}
        </div>
      )}
    >
      <StyledButton type="text">
        <Avatar
          size={36}
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          icon={<UserOutlined style={{ fontSize: 18 }} />}
        />
        {!isMobile && (
          <Text style={{ color: 'white', fontWeight: 600, fontSize: 14 }}>
            {user.Person?.firstName || user.username}
          </Text>
        )}
      </StyledButton>
    </Dropdown>
  );
};

export default UserSettingMenu;

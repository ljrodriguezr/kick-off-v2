import { Layout } from 'antd';
import { isMobile } from 'react-device-detect';

const { Header } = Layout;
const drawerWidth = 260;
const collapsedWidth = 72;

const AppBar = ({ open, children, ...props }) => {
  return (
    <Header
      {...props}
      style={{
        background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        marginLeft: isMobile
          ? 0
          : open
          ? `${drawerWidth}px`
          : `${collapsedWidth}px`,
        width: isMobile
          ? '100%'
          : open
          ? `calc(100% - ${drawerWidth}px)`
          : `calc(100% - ${collapsedWidth}px)`,
        padding: '0 36px',
        height: 72,
        lineHeight: '72px',
        boxShadow: '0 2px 12px rgba(37, 99, 235, 0.12)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 999,
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        ...props.style,
      }}
    >
      {children}
    </Header>
  );
};

export default AppBar;

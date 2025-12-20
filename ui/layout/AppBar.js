import { Layout } from 'antd';

const { Header } = Layout;
const drawerWidth = 300;

const AppBar = ({ open, children, ...props }) => {
  return (
    <Header
      {...props}
      style={{
        background: 'var(--dashboard-header, #1f3b68)',
        transition: 'margin 0.2s cubic-bezier(0.4, 0, 0.6, 1)',
        marginLeft: open ? `${drawerWidth}px` : 0,
        padding: '0 20px',
        height: 64,
        lineHeight: '64px',
        boxShadow: '0 6px 24px rgba(15, 35, 64, 0.12)',
        ...props.style,
      }}
    >
      {children}
    </Header>
  );
};

export default AppBar;

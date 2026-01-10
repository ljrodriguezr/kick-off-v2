import { isMobile } from 'react-device-detect';

const drawerWidth = 260;
const collapsedWidth = 72;

const Main = ({ open, children, ...props }) => {
  return (
    <main
      {...props}
      style={{
        flexGrow: 1,
        padding: isMobile ? '24px 16px' : '36px 40px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        marginLeft: isMobile
          ? 0
          : open
          ? `${drawerWidth}px`
          : `${collapsedWidth}px`,
        marginTop: '72px',
        minHeight: 'calc(100vh - 72px)',
        background: '#f8fafc',
        ...props.style,
      }}
    >
      {children}
    </main>
  );
};

export default Main;

import { isMobile } from 'react-device-detect';

const Main = ({ open, children, ...props }) => {
  return (
    <main
      {...props}
      style={{
        flexGrow: 1,
        padding: 24,
        transition: 'margin 0.2s cubic-bezier(0.4, 0, 0.6, 1)',
        marginLeft: isMobile ? 0 : 0,
        background: 'var(--dashboard-bg, #f4f6fb)',
        ...props.style,
      }}
    >
      {children}
    </main>
  );
};

export default Main;

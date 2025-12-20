const DrawerHeader = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: 64,
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '0 12px',
        justifyContent: 'flex-end',
        backgroundColor: 'var(--dashboard-header, #1f3b68)',
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default DrawerHeader;

const Popper = ({ open, children, style, ...rest }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', zIndex: 10, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Popper;

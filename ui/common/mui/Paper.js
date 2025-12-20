const Paper = ({ variant, className, style, children, ...rest }) => {
  const baseStyle = {
    background: '#fff',
    borderRadius: 6,
    border: variant === 'outlined' ? '1px solid #d9d9d9' : 'none',
  };

  return (
    <div className={className} style={{ ...baseStyle, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Paper;

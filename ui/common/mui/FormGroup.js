const FormGroup = ({ row, children, style, ...rest }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: row ? 'row' : 'column',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default FormGroup;

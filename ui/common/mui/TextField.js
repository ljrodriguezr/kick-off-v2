import { Input, Select } from 'antd';

const { TextArea, Password } = Input;

const TextField = ({
  label,
  helperText,
  error,
  fullWidth,
  margin,
  size = 'middle',
  variant,
  select,
  children,
  type,
  InputLabelProps,
  ...rest
}) => {
  const marginBottom = margin === 'dense' ? 8 : margin === 'normal' ? 16 : 0;
  const widthStyle = fullWidth ? { width: '100%' } : {};
  const Label = label ? (
    <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
      {label}
    </label>
  ) : null;

  if (select) {
    return (
      <div style={{ marginBottom }}>
        {Label}
        <Select
          size={size}
          status={error ? 'error' : undefined}
          style={widthStyle}
          {...rest}
        >
          {children}
        </Select>
        {helperText && (
          <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
            {helperText}
          </div>
        )}
      </div>
    );
  }

  const InputComponent =
    type === 'password' ? Password : rest.multiline ? TextArea : Input;

  return (
    <div style={{ marginBottom }}>
      {Label}
      <InputComponent
        {...rest}
        type={type !== 'password' ? type : undefined}
        size={size}
        style={{ ...widthStyle, ...(rest.style || {}) }}
        status={error ? 'error' : undefined}
      />
      {helperText && (
        <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default TextField;

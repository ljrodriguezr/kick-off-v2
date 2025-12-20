import { Input, Select } from 'antd';

const { TextArea, Password } = Input;

const mapSize = (size) => {
  if (size === 'small' || size === 'large') return size;
  return 'middle';
};

const CompatTextField = ({
  label,
  helperText,
  error,
  fullWidth,
  margin,
  size,
  variant,
  select,
  children,
  type,
  InputLabelProps,
  onChange,
  onBlur,
  value,
  defaultValue,
  name,
  disabled,
  id,
  inputProps,
  multiline,
  rows,
  ...rest
}) => {
  const marginBottom = margin === 'dense' ? 8 : margin === 'normal' ? 16 : 0;
  const widthStyle = fullWidth ? { width: '100%' } : {};
  const labelShrink = InputLabelProps?.shrink;

  if (type === 'file') {
    return (
      <div style={{ marginBottom }}>
        {label && (
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          type="file"
          disabled={disabled}
          style={{ ...widthStyle }}
          onChange={onChange}
          onBlur={onBlur}
          value={undefined}
          {...inputProps}
          {...rest}
        />
        {helperText && (
          <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
            {helperText}
          </div>
        )}
      </div>
    );
  }

  if (select) {
    return (
      <div style={{ marginBottom }}>
        {label && (
          <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
            {label}
          </label>
        )}
        <Select
          id={id}
          size={mapSize(size)}
          status={error ? 'error' : undefined}
          style={widthStyle}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          onBlur={onBlur}
          onChange={(val) => {
            if (onChange) onChange({ target: { value: val } });
          }}
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
    type === 'password' ? Password : multiline ? TextArea : Input;

  return (
    <div style={{ marginBottom }}>
      {label && (
        <label style={{ display: 'block', fontSize: 12, marginBottom: 4 }}>
          {label}
        </label>
      )}
      <InputComponent
        id={id}
        name={name}
        disabled={disabled}
        size={mapSize(size)}
        status={error ? 'error' : undefined}
        style={{ ...widthStyle, ...(rest.style || {}) }}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
        rows={rows}
        type={type !== 'password' ? type : undefined}
        {...rest}
      />
      {helperText && (
        <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default CompatTextField;

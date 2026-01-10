import { Button as AntButton, Space } from 'antd';

const mapType = (variant, color) => {
  if (variant === 'text') return 'text';
  if (variant === 'outlined')
    return color === 'primary' ? 'default' : 'default';
  if (variant === 'contained')
    return color === 'primary' ? 'primary' : 'default';
  return color === 'primary' ? 'primary' : 'default';
};

const Button = ({
  variant,
  color,
  fullWidth,
  startIcon,
  endIcon,
  children,
  ...rest
}) => {
  const type = mapType(variant, color);
  const ghost = variant === 'outlined';

  return (
    <AntButton type={type} ghost={ghost} block={fullWidth} {...rest}>
      {startIcon || endIcon ? (
        <Space size={6}>
          {startIcon}
          {children}
          {endIcon}
        </Space>
      ) : (
        children
      )}
    </AntButton>
  );
};

export default Button;

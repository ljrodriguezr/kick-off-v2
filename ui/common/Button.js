import { Button as AntButton, Space } from 'antd';

const mapType = (variant, color) => {
  if (variant === 'text') return 'text';
  if (variant === 'outlined') return 'default';
  if (variant === 'contained')
    return color === 'primary' ? 'primary' : 'default';
  return color === 'primary' ? 'primary' : 'default';
};

const mapSize = (size) => {
  if (size === 'small' || size === 'large') return size;
  return 'middle';
};

const Button = ({
  variant,
  color,
  fullWidth,
  size,
  startIcon,
  endIcon,
  children,
  ...rest
}) => {
  const type = mapType(variant, color);
  const ghost = variant === 'outlined';
  const antSize = mapSize(size);

  return (
    <AntButton
      type={type}
      ghost={ghost}
      block={fullWidth}
      size={antSize}
      {...rest}
    >
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

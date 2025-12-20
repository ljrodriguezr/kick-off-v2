import { Spin } from 'antd';

const CircularProgress = ({ size, style, ...rest }) => {
  const sizeMap = { small: 'small', medium: 'default', large: 'large' };
  const antSize =
    typeof size === 'string' ? sizeMap[size] || 'default' : 'default';
  const spinnerStyle =
    typeof size === 'number' ? { fontSize: size, ...style } : style;
  return <Spin size={antSize} style={spinnerStyle} {...rest} />;
};

export default CircularProgress;

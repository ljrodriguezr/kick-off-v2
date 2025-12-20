import { Spin } from 'antd';

const CircularProgress = ({ size, className, style }) => {
  const sizeMap = { small: 'small', medium: 'default', large: 'large' };
  const antSize =
    typeof size === 'string' ? sizeMap[size] || 'default' : 'default';
  const spinnerStyle =
    typeof size === 'number' ? { fontSize: size, ...style } : style;

  return <Spin size={antSize} className={className} style={spinnerStyle} />;
};

export default CircularProgress;

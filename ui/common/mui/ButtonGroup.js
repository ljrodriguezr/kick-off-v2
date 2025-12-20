import { Button } from 'antd';

const ButtonGroup = ({ children, ...rest }) => {
  return <Button.Group {...rest}>{children}</Button.Group>;
};

export default ButtonGroup;

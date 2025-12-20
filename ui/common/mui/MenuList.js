import { Menu } from 'antd';

const MenuList = ({ children, ...rest }) => {
  return <Menu {...rest}>{children}</Menu>;
};

export default MenuList;

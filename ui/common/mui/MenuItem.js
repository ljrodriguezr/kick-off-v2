import { Menu, Select } from 'antd';

const MenuItem = ({ value, children, ...rest }) => {
  if (value !== undefined) {
    return (
      <Select.Option value={value} {...rest}>
        {children}
      </Select.Option>
    );
  }
  return <Menu.Item {...rest}>{children}</Menu.Item>;
};

export default MenuItem;

import { Switch as AntSwitch } from 'antd';

const Switch = ({ checked, onChange, ...rest }) => {
  return (
    <AntSwitch
      checked={checked}
      onChange={(value) => {
        if (onChange) onChange({ target: { checked: value } }, value);
      }}
      {...rest}
    />
  );
};

export default Switch;

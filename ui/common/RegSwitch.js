import React from 'react';
import { useState } from 'react';
import { Switch, Space, Typography } from 'antd';

// eslint-disable-next-line react/display-name
const Switch = React.forwardRef(
  ({ onChange, onBlur, id, name, label, value = false }, ref) => {
    const [state, setState] = useState(value);

    const handleChange = (checked) => {
      setState(checked);
      if (onChange) onChange({ target: { checked } });
    };

    return (
      <Space ref={ref} align="center">
        <Switch
          id={id}
          onBlur={onBlur}
          checked={state}
          onChange={handleChange}
          name={name}
        />
        <Typography.Text>{label}</Typography.Text>
      </Space>
    );
  },
);

export default Switch;

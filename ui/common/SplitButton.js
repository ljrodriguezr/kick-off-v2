import React, { useState } from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const SplitButton = ({ options, onClick }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleClick = async () => {
    console.info(`You clicked ${selectedOption.name}`);
    console.info(`You clicked ${selectedOption.service}`);
    const data = 'sto es la data';
    if (onClick) {
      onClick(selectedOption.service, data);
    }
  };

  const handleMenuItemClick = async (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Button.Group>
        <Button
          onClick={handleClick}
          disabled={selectedOption?.active === false}
          type="primary"
        >
          {selectedOption.name}
        </Button>
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => {
                const option = options.find((opt) => opt.name === key);
                if (option) handleMenuItemClick(option);
              }}
              items={options.map((option) => ({
                key: option.name,
                label: option.name,
                disabled: option.active === false,
              }))}
            />
          }
          trigger={['click']}
        >
          <Button icon={<DownOutlined />} />
        </Dropdown>
      </Button.Group>
    </>
  );
};

export default SplitButton;

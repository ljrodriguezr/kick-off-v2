import React, { useState } from 'react';
import { Button } from 'antd';

const HoverButton = ({ style, onMouseEnter, onMouseLeave, children }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    onMouseEnter && onMouseEnter();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onMouseLeave && onMouseLeave();
  };

  const buttonStyles = {
    ...style,
    backgroundColor: hovered ? '#BDCA32' : '#384152',
    color: '#FFFFFF',
  };

  return (
    <Button
      size="small"
      type="primary"
      style={buttonStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Button>
  );
};

export default HoverButton;

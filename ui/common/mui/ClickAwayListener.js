import { useEffect, useRef } from 'react';

const ClickAwayListener = ({ onClickAway, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      if (onClickAway) onClickAway(event);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClickAway]);

  return <span ref={ref}>{children}</span>;
};

export default ClickAwayListener;

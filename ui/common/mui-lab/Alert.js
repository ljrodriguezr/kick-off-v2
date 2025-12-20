import { Alert as AntAlert } from 'antd';

const Alert = ({ severity, title, children, ...rest }) => {
  const type = severity || rest.type || 'info';
  return (
    <AntAlert
      type={type}
      message={title}
      description={children}
      showIcon
      {...rest}
    />
  );
};

export default Alert;

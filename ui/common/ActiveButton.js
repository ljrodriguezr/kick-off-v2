import { Button } from 'antd';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';
import { useState } from 'react';
import { useEffect } from 'react';

const defineLabel = (state) => {
  if (state) {
    if (isMobile) return null;
    return 'Activado';
  }
  if (isMobile) return null;
  return 'Desactivado';
};

const defineIcon = (state) => {
  if (state) {
    return <DeleteOutlined />;
  }
  return <UndoOutlined />;
};

const getButtonStyle = (state) => {
  if (state) {
    return {
      background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
      borderColor: '#52c41a',
      color: '#ffffff',
      fontWeight: 500,
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(82, 196, 26, 0.3)',
      transition: 'all 0.3s ease',
    };
  }
  return {
    background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
    borderColor: '#ff4d4f',
    color: '#ffffff',
    fontWeight: 500,
    borderRadius: 6,
    boxShadow: '0 2px 4px rgba(255, 77, 79, 0.3)',
    transition: 'all 0.3s ease',
  };
};

const getHoverStyle = (state) => {
  if (state) {
    return {
      background: 'linear-gradient(135deg, #73d13d 0%, #95de64 100%)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(82, 196, 26, 0.4)',
    };
  }
  return {
    background: 'linear-gradient(135deg, #ff7875 0%, #ffa39e 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(255, 77, 79, 0.4)',
  };
};

const ActiveButton = ({
  rowId,
  active,
  service,
  access,
  apiHandler,
  fullWidth = true,
}) => {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState();
  const [icon, setIcon] = useState();
  const [buttonStyle, setButtonStyle] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const change = async () => {
    setLoading(true);
    try {
      if (apiHandler) {
        await apiHandler(rowId, !state);
      } else {
        if (state) await service.deactivate(rowId);
        else await service.activate(rowId);
      }
      setState(!state);
      if (state) snackbar.error(enqueueSnackbar, 'Desactivado');
      else snackbar.success(enqueueSnackbar, 'Activado');
    } catch (error) {
      snackbar.error(enqueueSnackbar, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setState(active);
  }, [active]);

  useEffect(() => {
    setButtonStyle(getButtonStyle(state));
    setLabel(defineLabel(state));
    setIcon(defineIcon(state));
  }, [state]);

  if (!rowId) return <></>;

  return (
    <div style={{ width: isMobile ? 'auto' : 100 }}>
      <Button
        size="small"
        block={fullWidth}
        disabled={
          loading ||
          (access && ((!access?.write && !state) || (!access?.remove && state)))
        }
        onClick={change}
        icon={!loading ? icon : null}
        loading={loading}
        style={buttonStyle}
        onMouseEnter={(e) => {
          const hoverStyle = getHoverStyle(state);
          e.currentTarget.style.background = hoverStyle.background;
          e.currentTarget.style.transform = hoverStyle.transform;
          e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
        }}
        onMouseLeave={(e) => {
          const normalStyle = getButtonStyle(state);
          e.currentTarget.style.background = normalStyle.background;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = normalStyle.boxShadow;
        }}
      >
        {label}
      </Button>
    </div>
  );
};

export default ActiveButton;

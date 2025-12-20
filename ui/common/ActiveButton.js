import { Button } from 'antd';
import { DeleteOutlined, UndoOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';
import { useState } from 'react';
import { useEffect } from 'react';

const defineButtonType = (state) => {
  return state ? 'primary' : 'default';
};

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
  const [buttonType, setButtonType] = useState();
  const [label, setLabel] = useState();
  const [icon, setIcon] = useState();
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
    setButtonType(defineButtonType(state));
    setLabel(defineLabel(state));
    setIcon(defineIcon(state));
  }, [state]);

  if (!rowId) return <></>;

  return (
    <div style={{ width: isMobile ? 'auto' : 100 }}>
      <Button
        type={buttonType}
        size="small"
        block={fullWidth}
        disabled={
          loading ||
          (access && ((!access?.write && !state) || (!access?.remove && state)))
        }
        onClick={change}
        icon={!loading ? icon : null}
        loading={loading}
      >
        {label}
      </Button>
    </div>
  );
};

export default ActiveButton;

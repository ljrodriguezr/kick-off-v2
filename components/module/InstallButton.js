import Spinner from '@ui/common/Spinner';
import { Button } from 'antd';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';
import { useState } from 'react';
import { moduleService } from '@services/module.service';
import { useRouter } from 'next/router';

const InstallButton = ({ module }) => {
  const router = useRouter();
  const [installed] = useState(module.installed);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const label = () => (installed ? 'Actualizar' : 'Instalar');
  const messageLabel = () => (installed ? 'actualizado' : 'instalado');

  const onSubmit = async () => {
    setLoading(true);
    try {
      await moduleService.install(module.id);
      snackbar.success(
        enqueueSnackbar,
        `Módulo ${module.name} ${messageLabel()}`,
      );
      setTimeout(() => router.reload(), 2000);
    } catch (error) {
      snackbar.error(enqueueSnackbar, error);
    } finally {
      setLoading(false);
    }
  };

  if (!module.id) return <></>;

  return (
    <div style={{ width: 120 }}>
      <Button
        size="small"
        type="primary"
        block
        onClick={onSubmit}
        disabled={loading}
      >
        {loading && <Spinner />}
        {label()}
      </Button>
    </div>
  );
};

export default InstallButton;

import { Modal, Input, Button, Space, Typography } from 'antd';
import Loading from '@ui/common/Loading';
import changePasswordFormOptions from '@validations/user/ChangePassword.schema';
import { useForm } from 'react-hook-form';
import { userService } from '@services/user.service';
import { authService } from '@services/auth.service';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { snackbar } from '@lib/snackbar';

const { Text } = Typography;

const ChangePasswordDialog = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(changePasswordFormOptions);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = async (data) => {
    if (data.password != data.confirm) {
      snackbar.error(
        enqueueSnackbar,
        'Las nueva contraseña no coincide con la confirmación',
      );
      return;
    }
    delete data.confirm;
    if (!loading) {
      setLoading(true);
      try {
        const user = await authService.user();
        await userService.changePassword(user.id, data);
        snackbar.success(enqueueSnackbar, 'Contraseña modificada con éxito');
        reset();
        props.onClose();
      } catch (error) {
        snackbar.error(enqueueSnackbar, error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal
        title="Cambio de Contraseña"
        open={props.open}
        onCancel={props.onClose}
        footer={[
          <Button key="cancel" onClick={props.onClose}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            Confirmar
          </Button>,
        ]}
        width={500}
      >
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary">
            Rellene los siguientes formularios para poder cambiar su contraseña.
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div>
              <label
                htmlFor="current"
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Contraseña actual
              </label>
              <Input.Password
                id="current"
                placeholder="Indique su contraseña actual"
                size="middle"
                {...register('current')}
                status={errors.current ? 'error' : ''}
              />
              {errors.current?.message && (
                <div style={{ color: '#ff4d4f', fontSize: 14, marginTop: 4 }}>
                  {errors.current.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Nueva contraseña
              </label>
              <Input.Password
                id="password"
                placeholder="Indique su nueva contraseña"
                size="middle"
                {...register('password')}
                status={errors.password ? 'error' : ''}
              />
              {errors.password?.message && (
                <div style={{ color: '#ff4d4f', fontSize: 14, marginTop: 4 }}>
                  {errors.password.message}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm"
                style={{
                  display: 'block',
                  marginBottom: 4,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Confirmar nueva contraseña
              </label>
              <Input.Password
                id="confirm"
                placeholder="Confirme su nueva contraseña"
                size="middle"
                {...register('confirm')}
                status={errors.confirm ? 'error' : ''}
              />
              {errors.confirm?.message && (
                <div style={{ color: '#ff4d4f', fontSize: 14, marginTop: 4 }}>
                  {errors.confirm.message}
                </div>
              )}
            </div>
          </Space>
        </form>
      </Modal>

      {loading && <Loading />}
    </>
  );
};

export default ChangePasswordDialog;

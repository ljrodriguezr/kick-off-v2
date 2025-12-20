import Grid from '@ui/common/Grid';
import { Space } from 'antd';
import ActiveButton from '@ui/common/ActiveButton';
import UpdateButton from '@ui/common/UpdateButton';

const ActionCell = ({
  record,
  service,
  access,
  url,
  activate = true,
  update = true,
  roles,
  state,
}) => {
  const parseUrl = () => (url && record?.id ? `${url}/${record.id}` : '');

  const isUserOrEmployee =
    roles?.user?.code === 'user' && roles?.employee?.code === 'employee';

  const canUpdate = access?.write && update && (!roles || isUserOrEmployee);

  return (
    <Grid>
      <Space size={8}>
        {canUpdate && <UpdateButton url={parseUrl()} state={state} />}
        {activate && (
          <ActiveButton
            rowId={record.id}
            active={record.row.active}
            service={service}
            access={access}
          />
        )}
      </Space>
    </Grid>
  );
};

export default ActionCell;

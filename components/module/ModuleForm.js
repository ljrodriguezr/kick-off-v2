import Grid from '@ui/common/Grid';
import { Card, Tabs, Typography } from 'antd';
import PagesList from '@components/page/PagesList';
import PagesTable from '@components/page/PagesTable';
import MenusList from '@components/menu/MenusList';
import MenusTable from '@components/menu/MenusTable';
import RolesList from '@components/role/RolesList';
import RolesTable from '@components/role/RolesTable';
import InstallButton from './InstallButton';
import MobilePicker from '@ui/common/MobilePicker';
import { useState } from 'react';

const { Title, Text } = Typography;

const ModuleForm = ({ record }) => {
  const [tab, setTab] = useState('pages');

  const moduleFilter = () => {
    return { Module: { id: record.id } };
  };

  return (
    <Grid item container xs={12}>
      <Grid item container style={{ marginTop: 5 }} xs={12}>
        <Grid item container justifyContent="space-between" xs={12}>
          <Grid>
            <Title level={4} style={{ marginBottom: 0 }}>
              {record.name}
            </Title>
          </Grid>
          <Grid>
            <InstallButton module={record} />
          </Grid>
        </Grid>
        <Text type="secondary">{record.description}</Text>
      </Grid>
      <Grid item xs={12}>
        <Card style={{ minHeight: '90vh' }}>
          <Tabs
            activeKey={tab}
            onChange={setTab}
            items={[
              {
                key: 'pages',
                label: 'Páginas',
                children: (
                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    xs={12}
                    spacing={1}
                    style={{ padding: '1em' }}
                  >
                    <MobilePicker
                      mobile={<PagesList where={moduleFilter()} />}
                      web={<PagesTable where={moduleFilter()} />}
                    />
                  </Grid>
                ),
              },
              {
                key: 'menus',
                label: 'Menús',
                children: (
                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    xs={12}
                    spacing={1}
                    style={{ padding: '1em' }}
                  >
                    <MobilePicker
                      mobile={<MenusList where={moduleFilter()} />}
                      web={<MenusTable where={moduleFilter()} />}
                    />
                  </Grid>
                ),
              },
              {
                key: 'roles',
                label: 'Roles',
                children: (
                  <Grid
                    item
                    container
                    justifyContent="flex-start"
                    xs={12}
                    spacing={1}
                    style={{ padding: '1em' }}
                  >
                    <MobilePicker
                      mobile={<RolesList where={moduleFilter()} />}
                      web={<RolesTable where={moduleFilter()} />}
                    />
                  </Grid>
                ),
              },
            ]}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default ModuleForm;

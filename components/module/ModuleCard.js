import Grid from '@ui/common/Grid';
import { Avatar, Card, Typography } from 'antd';
import InstallButton from '@components/module/InstallButton';
import UpdateButton from '@ui/common/UpdateButton';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import Image from 'next/image';

const { Title, Text } = Typography;

const ModuleCard = ({ url, module }) => {
  const router = useRouter();

  const shouldPush = () => {
    return url && isMobile;
  };

  const borderColor = module.active ? '#BDCA32' : '#5BA3A1';

  return (
    <Card
      style={{
        borderLeft: `10px solid ${borderColor}`,
        margin: 3,
        cursor: shouldPush() ? 'pointer' : 'default',
      }}
      onClick={() => (shouldPush() ? router.push(url) : null)}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Avatar
          shape="square"
          style={{
            backgroundColor: '#fff',
            border: `1px solid ${borderColor}`,
            width: 70,
            height: 70,
          }}
        >
          <div style={{ width: 46, height: 46, position: 'relative' }}>
            <Image src={module.icon} width={200} height={200} alt="Icon" />
          </div>
        </Avatar>
        <div style={{ flex: 1 }}>
          <Title level={5} style={{ marginBottom: 4 }}>
            {module.name}
          </Title>
          <div style={{ marginBottom: 10 }}>
            <Text type="secondary">{module.subname}</Text>
          </div>
          {!isMobile && (
            <Grid item container justifyContent="flex-end" xs={12} spacing={1}>
              <div style={{ margin: 1 }}>
                <UpdateButton url={url}>Detalles</UpdateButton>
              </div>
              {module.code !== 'base' && (
                <div style={{ margin: 1 }}>
                  <InstallButton module={module} />
                </div>
              )}
            </Grid>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ModuleCard;

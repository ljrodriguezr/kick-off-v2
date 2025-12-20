import { Avatar, Card as UICard, Typography } from 'antd';
import * as Icons from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Text } = Typography;

const iconMap = {
  dashboard: 'DashboardOutlined',
  person: 'UserOutlined',
  settings: 'SettingOutlined',
  home: 'HomeOutlined',
  menu: 'MenuOutlined',
  folder: 'FolderOutlined',
  description: 'FileTextOutlined',
  assignment: 'FormOutlined',
  people: 'TeamOutlined',
  business: 'BankOutlined',
  list: 'UnorderedListOutlined',
  edit: 'EditOutlined',
  delete: 'DeleteOutlined',
  add: 'PlusOutlined',
};

const getIcon = (iconName) => {
  if (!iconName) return null;
  const antIconName = iconMap[iconName.toLowerCase()] || 'FileOutlined';
  const IconComponent = Icons[antIconName];
  return IconComponent ? <IconComponent style={{ fontSize: 18 }} /> : null;
};

const Card = ({ menu }) => {
  const router = useRouter();

  const push = () => {
    if (!menu?.Page?.url) return;
    router.push(menu.Page.url);
  };

  return (
    <UICard
      style={{
        borderLeft: '10px solid #BDCA32',
        margin: 3,
        minHeight: 100,
        cursor: 'pointer',
      }}
      onClick={() => push()}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Avatar
          shape="square"
          style={{ backgroundColor: '#2b6cb0', color: '#fff' }}
        >
          {getIcon(menu.icon)}
        </Avatar>
        <div>
          <Text strong>{menu.name}</Text>
          <div style={{ color: '#6b7280', fontSize: 12 }}>
            {menu.description}
          </div>
        </div>
      </div>
    </UICard>
  );
};

export default Card;

import { Avatar, Card as UICard, Typography, Badge } from 'antd';
import * as Icons from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Text, Title } = Typography;

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
  file: 'FileOutlined',
  chart: 'BarChartOutlined',
  calendar: 'CalendarOutlined',
  mail: 'MailOutlined',
  bell: 'BellOutlined',
  tag: 'TagOutlined',
  shop: 'ShopOutlined',
  database: 'DatabaseOutlined',
};

const gradients = [
  'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
  'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
];

const getIcon = (iconName) => {
  if (!iconName) return null;
  const antIconName = iconMap[iconName.toLowerCase()] || 'FileOutlined';
  const IconComponent = Icons[antIconName];
  return IconComponent ? <IconComponent style={{ fontSize: 22 }} /> : null;
};

const Card = ({ menu }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const push = () => {
    if (!menu?.Page?.url) return;
    router.push(menu.Page.url);
  };

  const gradientIndex =
    Math.abs(
      menu.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0),
    ) % gradients.length;

  return (
    <UICard
      hoverable
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => push()}
      styles={{
        body: { padding: 0 },
      }}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 12px 40px rgba(0, 0, 0, 0.15)'
          : '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        cursor: 'pointer',
        height: '100%',
        border: 'none',
      }}
    >
      <div
        style={{
          background: gradients[gradientIndex],
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Avatar
          size={48}
          shape="square"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {getIcon(menu.icon)}
        </Avatar>
        <Icons.ArrowRightOutlined
          style={{
            fontSize: 18,
            color: '#fff',
            opacity: isHovered ? 1 : 0.6,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        />
      </div>
      <div style={{ padding: '20px' }}>
        <Title
          level={5}
          style={{
            margin: 0,
            marginBottom: 8,
            color: '#1f2937',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          {menu.name}
        </Title>
        <Text
          type="secondary"
          style={{
            fontSize: 13,
            display: 'block',
            lineHeight: '1.6',
            color: '#6b7280',
          }}
        >
          {menu.description || 'Acceso rápido a la funcionalidad'}
        </Text>
      </div>
    </UICard>
  );
};

export default Card;

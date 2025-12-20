import React from 'react';
import { Menu, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import * as Icons from '@ant-design/icons';
import styled from 'styled-components';

const StyledMenuItem = styled(Menu.Item)`
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px;
  margin: 4px 0;
  height: 42px;
  display: flex;
  align-items: center;

  &:hover {
    background: rgba(31, 59, 104, 0.08);
    color: #1f3b68;

    .anticon {
      color: #1f3b68;
    }

    span {
      font-weight: 600;
      color: #1f3b68;
    }
  }

  &.ant-menu-item-selected {
    background: rgba(31, 59, 104, 0.12);
    color: #1f3b68;
    font-weight: 600;

    .anticon {
      color: #1f3b68;
    }
  }
`;

const SidebarListItem = ({ icon, text, dir, urls, handleOpen }) => {
  const router = useRouter();
  const link = `${dir}`.concat('/').concat(urls);

  const onClick = async () => {
    await router.push(link);
    if (isMobile) handleOpen();
  };

  // Convertir el nombre del icono de Material-UI a Ant Design
  const getIcon = (iconName) => {
    if (!iconName) return null;

    // Mapeo de iconos comunes de Material-UI a Ant Design
    const iconMap = {
      'dashboard': 'DashboardOutlined',
      'person': 'UserOutlined',
      'settings': 'SettingOutlined',
      'home': 'HomeOutlined',
      'menu': 'MenuOutlined',
      'folder': 'FolderOutlined',
      'description': 'FileTextOutlined',
      'assignment': 'FormOutlined',
      'people': 'TeamOutlined',
      'business': 'BankOutlined',
      'list': 'UnorderedListOutlined',
      'edit': 'EditOutlined',
      'delete': 'DeleteOutlined',
      'add': 'PlusOutlined',
    };

    const antIconName = iconMap[iconName.toLowerCase()] || 'FileOutlined';
    const IconComponent = Icons[antIconName];

    return IconComponent ? (
      <IconComponent style={{ fontSize: '18px', color: '#1f3b68' }} />
    ) : null;
  };

  return (
    <Tooltip title={text} placement="right">
      <StyledMenuItem
        key={link}
        icon={getIcon(icon)}
        onClick={onClick}
      >
        {text}
      </StyledMenuItem>
    </Tooltip>
  );
};

export default SidebarListItem;

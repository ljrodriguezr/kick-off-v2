import React from 'react';
import { Menu, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import * as Icons from '@ant-design/icons';
import styled from 'styled-components';

const StyledMenuItem = styled(Menu.Item)`
  /* Estilo clásico de Ant Design con toques modernos */
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  margin: 0;
  padding-left: 24px !important;

  .anticon {
    font-size: 16px;
    min-width: 16px;
    margin-right: 10px;
  }
`;

const SidebarListItem = ({ icon, text, dir, urls, handleOpen }) => {
  const router = useRouter();
  const link = `${dir}`.concat('/').concat(urls);

  const onClick = async () => {
    await router.push(link);
    if (isMobile) handleOpen();
  };

  const getIcon = (iconName) => {
    if (!iconName) return null;

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
      calendar: 'CalendarOutlined',
      field: 'FieldTimeOutlined',
    };

    const antIconName = iconMap[iconName.toLowerCase()] || 'FileOutlined';
    const IconComponent = Icons[antIconName];

    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <Tooltip title={text} placement="right">
      <StyledMenuItem key={link} icon={getIcon(icon)} onClick={onClick}>
        {text}
      </StyledMenuItem>
    </Tooltip>
  );
};

export default SidebarListItem;

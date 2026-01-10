import { Menu, Alert, Typography } from 'antd';
import SidebarListItem from '@ui/layout/SidebarListItem';
import { useEffect, useState } from 'react';
import { menuService } from '@services/menu.service';
import { useRouter } from 'next/router';

const { SubMenu } = Menu;
const { Text } = Typography;

const upper = (text) => {
  return text ? text.toUpperCase() : text;
};

const hasChildren = (item) => {
  if (item?.dashboard) return false;
  const { children: children } = item;
  if (children === undefined) {
    return false;
  }
  if (children.constructor !== Array) {
    return false;
  }
  if (children.length === 0) {
    return false;
  }
  return true;
};

const MenuItem = ({ item, handleOpen }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} handleOpen={handleOpen} />;
};

const SingleLevel = ({ item, handleOpen }) => {
  if (!item?.Page && !item?.dashboard) return <></>;
  return (
    <SidebarListItem
      key={item.id}
      text={item.displayName || item.name}
      icon={item.icon}
      dir={item.Page?.url}
      handleOpen={handleOpen}
      urls=""
    />
  );
};

const MultiLevel = ({ item, handleOpen }) => {
  const { children: children } = item;

  return (
    <SubMenu key={item.id} title={upper(item.name)}>
      {children.map((child, key) => (
        <MenuItem key={key} item={child} handleOpen={handleOpen} />
      ))}
    </SubMenu>
  );
};

const SectionTitle = ({ title, collapsed }) => {
  if (collapsed) {
    // Mostrar solo la primera letra cuando está colapsado
    return (
      <div
        style={{
          padding: '16px 0',
          color: 'rgba(0, 0, 0, 0.45)',
          fontSize: 14,
          fontWeight: 700,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 0,
        }}
      >
        {title?.charAt(0) || ''}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '16px 24px 8px',
        color: 'rgba(0, 0, 0, 0.45)',
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }}
    >
      {title}
    </div>
  );
};

const SidebarList = ({ handleOpen, collapsed }) => {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();

  const load = async () => {
    try {
      const tree = await menuService.getTree();
      setMenus(tree);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <Alert
        message="Error al cargar los menus"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  const selectedKey = router.asPath;

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      defaultOpenKeys={menus.map((item) => item.id?.toString())}
      style={{
        borderRight: 0,
        height: '100%',
      }}
      theme="light"
    >
      {menus.map((item, key) => {
        if (item.header) {
          return (
            <Menu.ItemGroup
              key={`group-${item.id}`}
              title={<SectionTitle title={item.name} collapsed={collapsed} />}
            >
              {(item.children || []).map((child, idx) => (
                <MenuItem
                  key={`child-${item.id}-${idx}`}
                  item={child}
                  handleOpen={handleOpen}
                />
              ))}
            </Menu.ItemGroup>
          );
        }
        return <MenuItem key={key} item={item} handleOpen={handleOpen} />;
      })}
    </Menu>
  );
};

export default SidebarList;

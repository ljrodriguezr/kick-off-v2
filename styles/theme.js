const theme = {
  token: {
    colorPrimary: '#384152',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorBgContainer: '#fff',
    colorBgLayout: '#f5f7fa',
    fontFamily:
      'Titillium Web, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    borderRadius: 6,
  },
  components: {
    Button: {
      primaryColor: '#384152',
      borderRadius: 6,
    },
    Table: {
      headerBg: '#384152',
      headerColor: '#ffffff',
      headerSortActiveBg: '#4a5568',
      headerSortHoverBg: '#4a5568',
      rowHoverBg: '#f0f5ff',
      borderColor: '#e8e8e8',
      headerBorderRadius: 8,
    },
  },
};

// Colores personalizados para botones de acción
export const actionColors = {
  edit: {
    background: '#1677ff',
    hoverBackground: '#4096ff',
    color: '#ffffff',
  },
  active: {
    background: '#52c41a',
    hoverBackground: '#73d13d',
    color: '#ffffff',
  },
  inactive: {
    background: '#ff4d4f',
    hoverBackground: '#ff7875',
    color: '#ffffff',
  },
  view: {
    background: '#722ed1',
    hoverBackground: '#9254de',
    color: '#ffffff',
  },
  delete: {
    background: '#ff4d4f',
    hoverBackground: '#ff7875',
    color: '#ffffff',
  },
};

export default theme;

import { useState, useRef } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

const TableFilter = ({ column, onFilter, onReset, filterValue }) => {
  const [value, setValue] = useState(filterValue || '');
  const inputRef = useRef(null);

  const handleSearch = () => {
    onFilter(column.field, value);
  };

  const handleReset = () => {
    setValue('');
    onReset(column.field);
  };

  return (
    <div style={{ padding: 12, minWidth: 200 }}>
      <Input
        ref={inputRef}
        placeholder={`Buscar ${column.headerName || column.field}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={handleSearch}
        style={{ marginBottom: 8, display: 'block' }}
        allowClear
      />
      <Space>
        <Button
          type="primary"
          onClick={handleSearch}
          icon={<SearchOutlined />}
          size="small"
          style={{
            background: 'linear-gradient(135deg, #1677ff 0%, #4096ff 100%)',
            borderColor: '#1677ff',
            borderRadius: 4,
          }}
        >
          Buscar
        </Button>
        <Button onClick={handleReset} size="small" style={{ borderRadius: 4 }}>
          Limpiar
        </Button>
      </Space>
    </div>
  );
};

export const getColumnSearchProps = (
  column,
  searchFilters,
  onFilter,
  onReset,
) => {
  if (column.filterable === false) return {};

  const isFiltered = searchFilters[column.field];

  return {
    filterDropdown: ({ confirm, clearFilters }) => (
      <TableFilter
        column={column}
        filterValue={searchFilters[column.field]}
        onFilter={(field, value) => {
          onFilter(field, value);
          confirm();
        }}
        onReset={(field) => {
          onReset(field);
          clearFilters && clearFilters();
          confirm();
        }}
      />
    ),
    filterIcon: () => (
      <FilterOutlined
        style={{
          color: isFiltered ? '#1677ff' : undefined,
          fontSize: 14,
        }}
      />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // Focus en el input cuando se abre
      }
    },
  };
};

export default TableFilter;

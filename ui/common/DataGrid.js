import { useMemo, useState } from 'react';
import { Table } from 'antd';

const mapColumns = (columns = []) => {
  return columns
    .filter((column) => !column.hide)
    .map((column) => ({
      key: column.field,
      dataIndex: column.field,
      title: column.headerName || column.field,
      align: column.align,
      width: column.width,
      render: (value, record) =>
        column.renderCell
          ? column.renderCell({ row: record, value, id: record.id })
          : value,
    }));
};

const DataGrid = ({ rows, columns, loading }) => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const tableColumns = useMemo(() => mapColumns(columns), [columns]);

  return (
    <Table
      rowKey="id"
      dataSource={rows}
      columns={tableColumns}
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        pageSizeOptions: [10, 15, 20],
        onChange: (nextPage, nextPageSize) => {
          setPage(nextPage);
          if (nextPageSize) setPageSize(nextPageSize);
        },
        showSizeChanger: true,
      }}
      size="middle"
    />
  );
};

export default DataGrid;

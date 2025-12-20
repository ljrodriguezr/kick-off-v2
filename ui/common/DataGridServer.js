import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { page as pageHandler } from '@lib/page';
import { has, isEmpty, isEqual, pickBy } from 'lodash';
import { filterOperator } from '@lib/datagrid';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectDefaultFilter, add } from '@redux/reducers/filterSlice';
import { useDispatch } from 'react-redux';

const FILTER = {
  active: [true, false],
  count: true,
};

const parseColumns = (columns) => {
  if (!columns) return [];
  return columns.filter((item) => !item.hide);
};

const DataGridServer = ({
  where = {},
  orderBy,
  service,
  columns,
  parseHandler,
  sortHandler,
  filterHandler,
  isExport = false,
  roles,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const historyFilter = useSelector(selectDefaultFilter);
  const [dirty, setDirty] = useState(false);
  const [pageChecked, setPageChecked] = useState(false);
  const [defaultWhere] = useState(where);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnList] = useState(parseColumns(columns));
  const [filter, setFilter] = useState(
    pickBy({
      ...FILTER,
      take: pageSize,
      skip: (page - 1) * pageSize,
      filter: defaultWhere,
      orderby: orderBy,
      ...(historyFilter?.route === router.route
        ? historyFilter?.data || {}
        : {}),
    }),
  );
  const [lastFilter, setLastFilter] = useState({});
  const [filterModel, setFilterModel] = useState(
    historyFilter?.filterModel || {},
  );
  const [sortModel, setSortModel] = useState(historyFilter?.sortModel || []);
  const { enqueueSnackbar } = useSnackbar();

  const sortBy = useCallback(() => {
    if (isEmpty(sortModel)) return;
    return sortModel.map((item) => {
      const sort = sortHandler ? sortHandler(item.field, item.sort) : null;
      if (sort) return sort;
      return { [item.field]: item.sort };
    });
  }, [sortModel, sortHandler]);

  const filterBy = useCallback(() => {
    if (isEmpty(filterModel?.items)) return;
    return filterModel.items.map((item) => {
      const operator = filterOperator(item.operatorValue);
      if (!['isEmpty', 'isNotEmpty'].includes(operator?.code) && !item.value)
        return {};
      const filter = filterHandler
        ? filterHandler(item.columnField, item.value, operator)
        : null;
      if (filter) return filter;
      return operator.handler({
        field: item.columnField,
        operator,
        value: item.value,
      });
    })[0];
  }, [filterModel, filterHandler]);

  const parseHistoryFilter = useCallback(() => {
    if (dirty) return {};
    if (historyFilter?.route !== router.route) return {};
    return historyFilter?.data || {};
  }, [dirty, historyFilter, router]);

  useEffect(() => {
    if (!pageChecked && historyFilter?.route === router.route) {
      let _page = (historyFilter?.data?.skip || 0) / pageSize + 1;
      if (_page === 1) _page = 1;
      setPageChecked(true);
      setPage(_page);
      return;
    }
    const sort = sortBy();
    const filters = filterBy();
    const params = pickBy({
      ...FILTER,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderby: orderBy,
      ...parseHistoryFilter(),
    });
    if (!isEmpty(sort)) params.orderby = sort;
    if (!isEmpty(filters)) params.filter = { ...filters, ...defaultWhere };
    else if (!isEmpty(defaultWhere)) params.filter = defaultWhere;
    const updateFilter = () => {
      if (!isEqual(historyFilter?.data, params)) {
        dispatch(
          add({ route: router.route, data: params, filterModel, sortModel }),
        );
      }
    };
    if (!isEqual(filter, params)) {
      setFilter(params);
      updateFilter();
    }
    if (!dirty) setDirty(true);
  }, [
    page,
    pageSize,
    sortBy,
    filterBy,
    defaultWhere,
    dirty,
    dispatch,
    historyFilter,
    pageChecked,
    parseHistoryFilter,
    router,
    filterModel,
    sortModel,
    orderBy,
    filter,
  ]);

  useEffect(() => {
    if (loading || isEqual(filter, lastFilter)) return;
    setLoading(true);
    pageHandler.loader(
      enqueueSnackbar,
      async () => {
        const response = await service.getAll(filter);
        const data = parseHandler ? parseHandler(response.data) : response.data;
        setData(data);
        setRowCount(response.count);
        setLastFilter(filter);
      },
      () => setLoading(false),
      () => setData([]),
    );
  }, [enqueueSnackbar, filter, service, lastFilter, parseHandler, loading]);

  const tableColumns = columnList.map((column) => ({
    key: column.field,
    dataIndex: column.field,
    title: column.headerName || column.field,
    align: column.align,
    width: column.width,
    sorter: !!column.sortable,
    render: (value, record) =>
      column.renderCell
        ? column.renderCell({ row: record, value, id: record.id })
        : value,
  }));

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={tableColumns}
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        total: rowCount,
        showSizeChanger: true,
        pageSizeOptions: [10, 15, 20],
        onChange: (nextPage, nextPageSize) => {
          setPage(nextPage);
          if (nextPageSize) setPageSize(nextPageSize);
        },
      }}
      onChange={(pagination, _filters, sorter) => {
        if (sorter?.field && sorter?.order) {
          setSortModel([
            {
              field: sorter.field,
              sort: sorter.order === 'ascend' ? 'asc' : 'desc',
            },
          ]);
        } else {
          setSortModel([]);
        }
      }}
      size="middle"
    />
  );
};

export default DataGridServer;

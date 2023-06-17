import React from 'react';
import { Table } from 'antd';

export const TableWrapper: React.FC<ITable> = ({
  columns,
  dataSource,
  rowKey,
  loading = true,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={rowKey}
      pagination={false}
    />
  );
};

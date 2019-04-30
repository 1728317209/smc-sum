/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Table } from '@alifd/next';

export default class CustomTable extends Component {
  renderColumns = () => {
    const { columns } = this.props;
    return columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            title={item.title}
            key={item.key}
            cell={item.render}
            width={item.width}
          />
        );
      }
      return (
        <Table.Column
          key={item.key}
          title={item.title}
          dataIndex={item.dataIndex}
          width={item.width}
        />
      );
    });
  };

  render() {
    return <Table {...this.props}>{this.renderColumns()}</Table>;
  }
}

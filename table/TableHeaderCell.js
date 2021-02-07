import React from 'react';
import { Table } from 'semantic-ui-react';

const TableHeaderCell = props => {
  const handleClick = () => {
    if (props.noSort) return null;

    props.setActivePage(1);
    props.setSort({
      sortBy: props.field,
      direction:
        props.sort.sortBy !== props.field
          ? 'ascending'
          : props.sort.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    });
  };

  return (
    <Table.HeaderCell
      width={props.width}
      sorted={
        props.sort?.sortBy === props.field ? props.sort?.direction : undefined
      }
      collapsing={props.collapsing}
      onClick={handleClick}
    >
      {props.label}
    </Table.HeaderCell>
  );
};

export default TableHeaderCell;

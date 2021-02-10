import TableCell from './TableCell';

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
  const classes = [sorted, className];

  return (
    <TableCell
      {...rest}
      width={props.width}
      className={classNames(classes)}
      sorted={
        props.sort?.sortBy === props.field ? props.sort?.direction : undefined
      }
      collapsing={props.collapsing}
      onClick={handleClick}
    >
      {props.label}
    </TableCell>
  );
};

export default TableHeaderCell;

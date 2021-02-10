import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const TableCell = props => {
  const classes = [
    active,
    collapsing,
    disabled,
    error,
    negative,
    positive,
    selectable,
    singleLine && 'single line',
    warning,
    textAlign,
    verticalAlign,
    width,
    className,
  ];

  return (
    <td {...rest} className={classNames(classes)}>
      {children}
    </td>
  );
};

TableCell.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  collapsing: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  negative: PropTypes.bool,
  positive: PropTypes.bool,
  selectable: PropTypes.bool,
  singleLine: PropTypes.bool,
  icon: PropTypes.node,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  verticalAlign: PropTypes.oneOf('bottom', 'middle', 'top'),
  warning: PropTypes.bool,
  width: PropTypes.oneOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16),
};

export default TableCell;

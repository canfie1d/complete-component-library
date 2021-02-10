import PropTypes from 'prop-types';
import React from 'react';
import Menu from '../Menu';

/**
 * A component to render a pagination.
 */
const Pagination = ({
  ariaLabel,
  boundaryRange,
  disabled,
  ellipsisItem,
  siblingRange,
  totalPages,
}) => {
  const [activePage] = useState(1);

  const handleItemClick = (e, { value: nextActivePage }) => {
    setActivePage(nextActivePage);

    // Heads up! We need the cast to the "number" type there, as `activePage` can be a string
    if (+prevActivePage === +nextActivePage) return;

    setActivePage(nextActivePage);
  };

  const items = createPaginationItems({
    activePage,
    boundaryRange,
    hideEllipsis: _.isNil(ellipsisItem),
    siblingRange,
    totalPages,
  });

  return (
    <Menu {...rest} aria-label={ariaLabel} pagination role='navigation'>
      {_.map(items, ({ active, type, value }) =>
        PaginationItem.create(props[type], {
          defaultProps: {
            content: value,
            disabled,
            value,
          },
          overrideProps: handleItemOverrides(active, type, value),
        })
      )}
    </Menu>
  );
};

Pagination.propTypes = {
  ariaLabel: PropTypes.string,
  defaultActivePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  boundaryRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  ellipsisItem: customPropTypes.itemShorthand,
  firstItem: customPropTypes.itemShorthand,
  lastItem: customPropTypes.itemShorthand,
  nextItem: customPropTypes.itemShorthand,
  pageItem: customPropTypes.itemShorthand,
  prevItem: customPropTypes.itemShorthand,
  onPageChange: PropTypes.func,
  siblingRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

Pagination.autoControlledProps = ['activePage'];

Pagination.defaultProps = {
  ariaLabel: 'Pagination Navigation',
  boundaryRange: 1,
  ellipsisItem: '...',
  firstItem: {
    'aria-label': 'First item',
    content: '«',
  },
  lastItem: {
    'aria-label': 'Last item',
    content: '»',
  },
  nextItem: {
    'aria-label': 'Next item',
    content: '⟩',
  },
  pageItem: {},
  prevItem: {
    'aria-label': 'Previous item',
    content: '⟨',
  },
  siblingRange: 1,
};

const PaginationItem = ({ active, type }) => {
  const disabled = disabled || type === 'ellipsisItem';

  return (
    <Menu.Item
      active={active}
      disabled={disabled}
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      type={type}
      {...props}
    />
  );
};

PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    'ellipsisItem',
    'firstItem',
    'prevItem',
    'pageItem',
    'nextItem',
    'lastItem',
  ]),
};

Pagination.Item = PaginationItem;

export default Pagination;

import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Menu = ({
  attached,
  borderless,
  children,
  className,
  color,
  compact,
  fixed,
  floated,
  fluid,
  icon,
  inverted,
  pagination,
  pointing,
  secondary,
  size,
  stackable,
  tabular,
  text,
  vertical,
  widths,
  items,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState();
  const renderItems = () => {
    if (!!items.length) {
      return items.map((item, index) => (
        <MenuItem active={activeIndex === index}>{item}</MenuItem>
      ));
    }
  };

  const classes = [
    'ui',
    color,
    size,
    borderless,
    compact,
    fluid,
    inverted,
    pagination,
    pointing,
    secondary,
    stackable,
    text,
    vertical,
    attached,
    floated,
    icon,
    tabular,
    fixed,
    widths,
    className,
    'menu',
  ];

  return (
    <ul {...rest} className={classes}>
      {children ? children : renderItems()}
    </ul>
  );
};

Menu.propTypes = {
  /** A menu item or menu can have no borders. */
  borderless: PropTypes.bool,
  /** Primary content. */
  children: PropTypes.node,
  /** Additional classes. */
  className: PropTypes.string,
  /** Additional colors can be specified. */
  color: PropTypes.oneOf([
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
  ]),
  /** A menu can take up only the space necessary to fit its content. */
  compact: PropTypes.bool,
  /** A menu can be fixed to a side of its context. */
  fixed: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  /** A menu can be floated. */
  floated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),
  /** A vertical menu may take the size of its container. */
  fluid: PropTypes.bool,
  /** Shorthand array of props for Menu. */
  items: PropTypes.array,
  /** A menu can point to show its relationship to nearby content. */
  pointing: PropTypes.bool,
  /** A menu can adjust its appearance to de-emphasize its contents. */
  secondary: PropTypes.bool,
  /** A menu can stack at mobile resolutions. */
  stackable: PropTypes.bool,
  /** A menu can be formatted to show tabs of information. */
  tabular: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),
  /** A vertical menu displays elements vertically. */
  vertical: PropTypes.bool,
};

const MenuItem = ({
  active,
  children,
  className,
  color,
  content,
  disabled,
  fitted,
  header,
  icon,
  link,
  name,
  onClick,
  position,
}) => {
  const classes = [
    color,
    position,
    active,
    disabled,
    icon,
    header,
    link,
    fitted,
    onClick,
    onClick && 'button--transparent',
    'item',
    className,
  ];

  if (url) {
    return (
      <a
        {...rest}
        aria-current={active}
        aria-disabled={disabled}
        className={classes}
        href={url}
      >
        {icon && icon}
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        {...rest}
        aria-current={active}
        aria-disabled={disabled}
        className={classes}
        onClick={onClick}
      >
        {icon && icon}
        {children}
      </button>
    );
  }

  return (
    <li
      {...rest}
      aria-current={active}
      aria-disabled={disabled}
      className={classes}
    >
      {children}
    </li>
  );
};

MenuItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
  ]),
  disabled: PropTypes.bool,
  fitted: PropTypes.bool,
  icon: PropTypes.node,
  index: PropTypes.number,
  url: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
};

Menu.Item = MenuItem;

export default Menu;

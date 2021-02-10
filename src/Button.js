import classNames from 'classnames';

const Button = ({
  color,
  size,
  basic,
  circular,
  compact,
  fluid,
  icon,
  inverted,
  loading,
  negative,
  positive,
  primary,
  secondary,
  animated,
  className,
  onClick,
  type,
  role,
  tabIndex,
  children,
  ...rest
}) => {
  const classes = [
    'ui',
    color,
    size,
    basic,
    circular,
    compact,
    fluid,
    icon,
    inverted,
    loading,
    negative,
    positive,
    primary,
    secondary,
    animated,
    'button',
    className,
  ];

  return (
    <button
      className={classNames(classes)}
      onClick={onClick}
      type={type}
      role={role}
      tabIndex={tabIndex}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  role: 'button',
  tabIndex: 0,
  type: 'button',
  disabled: false,
};

export default Button;

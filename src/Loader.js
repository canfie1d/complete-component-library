import classNames from 'classnames';
import PropTypes from 'prop-types';

const Loader = ({
  active,
  children,
  className,
  content,
  disabled,
  indeterminate,
  inline,
  inverted,
  size,
}) => {
  const classes = [
    'ui',
    size,
    active,
    disabled,
    indeterminate,
    inverted,
    (children || content) && 'text',
    inline,
    'loader',
    className,
  ];

  return (
    <div {...rest} className={classNames(classes)}>
      {children}
    </div>
  );
};

Loader.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['centered'])]),
  inverted: PropTypes.bool,
  size: PropTypes.oneOf([
    'mini',
    'tiny',
    'small',
    'medium',
    'large',
    'big',
    'huge',
    'massive',
  ]),
};

export default Loader;

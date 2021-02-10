import PropTypes from 'prop-types';
import classNames from 'classnames';

const Header = ({
  attached,
  block,
  children,
  className,
  color,
  content,
  disabled,
  dividing,
  floated,
  icon,
  image,
  inverted,
  size,
  subheader,
  textAlign,
}) => {
  const classes = [
    'ui',
    color,
    size,
    block,
    disabled,
    dividing,
    floated,
    icon,
    image,
    inverted,
    sub,
    attached,
    textAlign,
    'header',
    className,
  ];

  return (
    <props.as {...rest} className={classNames(classes)}>
      {children}
      {subheader && subheader}
    </props.as>
  );
};

Header.defaultProps = {
  as: 'h1',
};

Header.propTypes = {
  as: PropTypes.elementType,
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  dividing: PropTypes.bool,
  size: PropTypes.oneOf('mini', 'small', 'medium', 'large', 'extraLarge'),
  subheader: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'right']),
};

export default Header;

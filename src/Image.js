import PropTypes from 'prop-types';

const Image = ({
  avatar,
  bordered,
  centered,
  circular,
  className,
  disabled,
  floated,
  fluid,
  inline,
  rounded,
  size,
  spaced,
  verticalAlign,
  wrapped,
  ui,
  alt,
}) => {
  const classes = [
    'ui',
    size,
    avatar,
    bordered,
    circular,
    centered,
    disabled,
    fluid,
    hidden,
    inline,
    rounded,
    spaced,
    floated,
    verticalAlign,
    'image',
    className,
  ];

  return <img {...rest} className={classNames(classes)} src={src} alt={alt} />;
};

Image.propTypes = {
  avatar: PropTypes.bool,
  bordered: PropTypes.bool,
  centered: PropTypes.bool,
  circular: PropTypes.bool,
  className: PropTypes.string,
  floated: PropTypes.oneOf(SUI.FLOATS),
  fluid: PropTypes.bool,
  inline: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf('tiny', 'small', 'medium', 'large', 'extraLarge'),
  verticalAlign: PropTypes.string,
};

export default Image;

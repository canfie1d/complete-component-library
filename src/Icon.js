/**
 * Main icon componnent used to manage all instances of icons throughout the app
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = props => {
  const {
    bordered,
    circular,
    className,
    color,
    corner,
    fitted,
    flipped,
    inverted,
    loading,
    name,
    rotated,
    size,
    ...rest
  } = props;

  const getIconAriaOptions = () => {
    const ariaOptions = {};
    const { 'aria-label': ariaLabel, 'aria-hidden': ariaHidden } = props;

    if (!ariaLabel) {
      ariaOptions['aria-hidden'] = 'true';
    } else {
      ariaOptions['aria-label'] = ariaLabel;
    }

    if (ariaHidden) {
      ariaOptions['aria-hidden'] = ariaHidden;
    }

    return ariaOptions;
  };

  const classes = [
    color,
    name,
    size,
    bordered && 'bordered',
    circular && 'circular',
    fitted && 'fitted',
    inverted && 'inverted',
    loading && 'loading',
    corner && `corner ${corner}`,
    flipped && `flipped ${flipped}`,
    rotated && `rotated ${rotated}`,
    'icon',
    className,
  ];

  const ElementType = props.as;
  const ariaOptions = getIconAriaOptions();

  return (
    <ElementType {...rest} {...ariaOptions} className={classNames(classes)} />
  );
};

Icon.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Formatted to appear bordered. */
  bordered: PropTypes.bool,

  /** Icon can formatted to appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the icon. */
  color: PropTypes.string,

  /** Icons can display a smaller corner icon. */
  corner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top left', 'top right', 'bottom left', 'bottom right']),
  ]),

  /** Fitted, without space to left or right of Icon. */
  fitted: PropTypes.bool,

  /** Icon can be flipped. */
  flipped: PropTypes.oneOf(['horizontally', 'vertically']),

  /** Formatted to have its colors inverted for contrast. */
  inverted: PropTypes.bool,

  /** Icon can be used as a simple loader. */
  loading: PropTypes.bool,

  /** Icon can rotated. */
  rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),

  /** Size of the icon. */
  size: PropTypes.oneOf([
    'mini',
    'tiny',
    'small',
    'large',
    'big',
    'huge',
    'massive',
  ]),

  /** Icon can have an aria label. */
  'aria-hidden': PropTypes.string,

  /** Icon can have an aria label. */
  'aria-label': PropTypes.string,
};

Icon.defaultProps = {
  as: 'i',
};

export default Icon;

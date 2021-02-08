import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * A flex row is used to lay out content.
 */
const FlexRow = (props) => {
  const classes = [
    'flex',
    props.wrap && 'flex--wrap',
    props.inline && 'flex--inline',
    props.reversed && 'flex--reversed',
    props.direction && `flex--${props.direction}`,
    props.alignment && `flex--align-${props.alignment}`,
    props.justify && `flex--justify-${props.justify}`,
    props.className && props.className,
  ];

  return (
    <div className={classNames(classes)} style={props.style}>
      {props.children}
    </div>
  );
};

FlexRow.defaultProps = {
  wrap: false,
  inline: false,
  direction: 'row',
};

FlexRow.propTypes = {
  /** A flex row can have its columns wrap after reaching mobile breakpoints. */
  wrap: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse']),
  inline: PropTypes.bool,
  children: PropTypes.node,
  alignment: PropTypes.oneOf(['start', 'center', 'end', 'flex-end']),
  justify: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  /** A flex row can specify that its columns should reverse order at different device sizes. */
  reversed: PropTypes.bool,
};

export default FlexRow;

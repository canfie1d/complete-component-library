import PropTypes from 'prop-types';
import FlexColumn from './FlexColumn';
import FlexRow from './FlexRow';

const Flex = (props) => {
  return (
    <FlexRow
      style={props.style}
      wrap={props.wrap}
      direction={props.direction}
      inline={props.inline}
      reversed={props.reversed}
      className={props.className}
      alignment={props.alignment}
      justify={props.justify}
    >
      {props.children}
    </FlexRow>
  );
};

Flex.Column = FlexColumn;
Flex.Row = FlexRow;

Flex.propTypes = {
  /** A flex row can have its columns wrap after reaching mobile breakpoints. */
  style: PropTypes.object,
  wrap: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse']),
  inline: PropTypes.bool,
  children: PropTypes.node,
  /** A flex row can specify that its columns should reverse order at different device sizes. */
  reversed: PropTypes.bool,
  alignment: PropTypes.oneOf([
    'flex-start',
    'start',
    'center',
    'end',
    'flex-end',
  ]),
  justify: PropTypes.oneOf([
    'flex-start',
    'start',
    'center',
    'end',
    'flex-end',
    'space-between',
    'space-around',
  ]),
};

export default Flex;

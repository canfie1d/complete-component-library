import Flex from './layout/Flex';

const LabelValueTextPair = (props) => {
  let styles = { fontWeight: 'bold' };

  styles = props.noWrap ? { ...styles, ...{ whiteSpace: 'nowrap' } } : styles;
  styles = props.small ? { ...styles, ...{ fontSize: '.75em' } } : styles;

  return (
    <Flex
      style={
        props.noBottomBorder
          ? { padding: props.padding }
          : {
              borderBottom: '1px solid #e5e6e5',
              padding: props.padding,
            }
      }
    >
      <Flex.Column grow={0} shrink={0} basis={props.leftColumnBasis}>
        <span style={styles}>{props.label}</span>
      </Flex.Column>
      <Flex.Column style={props.small ? { fontSize: '.75em' } : {}}>
        {props.children}
      </Flex.Column>
    </Flex>
  );
};

LabelValueTextPair.defaultProps = {
  leftColumnBasis: '120px',
  padding: '.5em',
};

export default LabelValueTextPair;

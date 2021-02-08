const FlexColumn = (props) => {
  return (
    <div
      className='flex__column'
      style={{
        flex: `${props.grow} ${props.shrink} ${props.basis}`,
        alignSelf: props.alignSelf,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

FlexColumn.defaultProps = {
  grow: 1,
  shrink: 1,
  basis: 'auto',
  alignSelf: 'auto',
};

export default FlexColumn;

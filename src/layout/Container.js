import { useMediaQuery } from '../util/useMediaQuery';

const Container = props => {
  const mediaQuery = useMediaQuery();
  const isSmallScreen = mediaQuery === 'xSmall' || mediaQuery === 'small';

  let style = isSmallScreen
    ? { maxWidth: '100%', ...props.style }
    : { maxWidth: '1440px', margin: '0 auto', ...props.style };

  style =
    props.text || props.placeholder
      ? { ...style, ...{ maxWidth: '700px' } }
      : style;

  style = props.noLimit ? { maxWidth: 'none' } : style;

  if (props.asSegment || props.placeholder) {
    return (
      <Container
        asSegment
        className={props.className}
        placeholder={props.placeholder}
        style={style}
        basic={props.basic}
      >
        {props.children}
      </Container>
    );
  }

  return (
    <div className={props.className} style={style}>
      {props.children}
    </div>
  );
};

export default Container;

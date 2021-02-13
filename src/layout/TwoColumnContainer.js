import { useMediaQuery } from '../util/useMediaQuery';
import Header from './Header';
import Flex from './layout/Flex';

const TwoColumnContainer = props => {
  const mediaQuery = useMediaQuery();
  const isMobile = mediaQuery === 'xSmall' || mediaQuery === 'small';
  const pStyle = {
    maxWidth: '300px',
    margin: 'auto',
    paddingBottom: '1em',
  };

  let style = {
    background: '#2d4434',
    color: '#ffffff',
    padding: '100px 1em',
    margin: '0',
    width: '100%',
  };

  if (props.imgSrc) {
    style = {
      ...style,
      ...{
        color: '#404443',
        backgroundImage: `url(${props.imgSrc})`,
        backgroundPosition: 'center',
      },
    };

    if (!isMobile) {
      style = {
        ...style,
        ...{ backgroundSize: '100%' },
      };
    }
  }

  return (
    <div style={style}>
      <Flex justify='space-around' alignment='center'>
        <Flex.Column>
          <Flex direction='column' alignment='center'>
            {props.columnOne.image}
            {props.columnOne.title && (
              <Header as='h3'>{props.columnOne.title}</Header>
            )}
            <p style={pStyle}>{props.columnOne.text}</p>
            {props.columnOne.action && props.columnOne.action}
          </Flex>
        </Flex.Column>
        <Flex.Column>
          <Flex direction='column' alignment='center'>
            {props.columnTwo.image}
            {props.columnTwo.title && (
              <Header as='h3'>{props.columnTwo.title}</Header>
            )}
            <p style={pStyle}>{props.columnTwo.text}</p>
            {props.columnTwo.action && props.columnTwo.action}
          </Flex>
        </Flex.Column>
      </Flex>
    </div>
  );
};

TwoColumnContainer.defaultProps = {
  verticalAlign: 'middle',
};

export default TwoColumnContainer;

import Header from './Header';
import Container from './Container';
import Divider from '../Divider';
import Flex from './Flex';

const ThreeColumnContainer = props => {
  const pStyle = {
    maxWidth: '300px',
    margin: 'auto',
  };

  return (
    <Container
      style={{ padding: '1em 1em 4em', background: 'white', margin: 0 }}
      asSegment
      placeholder
      basic
    >
      {props.title && (
        <>
          <Header textAlign='center' as='h2'>
            {props.title}
          </Header>
          <Divider style={{ margin: '0 auto 100px' }} />
        </>
      )}
      <Flex wrap>
        <Flex.Column style={{ marginTop: '4em' }}>
          {props.columnOne.image}
          <Header textAlign='center' as='h3'>
            {props.columnOne.title}
          </Header>
          <p style={pStyle}>{props.columnOne.text}</p>
        </Flex.Column>
        <Flex.Column style={{ marginTop: '4em' }}>
          {props.columnTwo.image}
          <Header textAlign='center' as='h3'>
            {props.columnTwo.title}
          </Header>
          <p style={pStyle}>{props.columnTwo.text}</p>
        </Flex.Column>
        <Flex.Column style={{ marginTop: '4em' }}>
          {props.columnThree.image}
          <Header textAlign='center' as='h3'>
            {props.columnThree.title}
          </Header>
          <p style={pStyle}>{props.columnThree.text}</p>
        </Flex.Column>
      </Flex>
    </Container>
  );
};

ThreeColumnContainer.defaultProps = {
  verticalAlign: 'middle',
};

export default ThreeColumnContainer;

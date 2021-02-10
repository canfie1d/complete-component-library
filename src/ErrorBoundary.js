import { withRouter } from 'react-router-dom';
import Hero from './Hero';
import Image from './Image';
import Container from './layout/Container';
import Flex from './layout/Flex';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error, errorInfo) {
    this.props.handleCaughtError(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <>
          <Hero headerText='Network Error'>
            <p>Sorry for the interuption- we ran into a network error.</p>
          </Hero>
          <Container asSegment basic>
            <Flex justify='space-around' wrap>
              <Flex.Column textAlign='center' style={{ zIndex: 1 }}>
                <Container
                  style={{ background: '#f9f9f9', padding: '1em' }}
                  text
                >
                  <p>
                    We've logged the error on our end so our engineers can take
                    a look.
                  </p>
                  <p>Refresh the page to try again.</p>
                  <p>
                    If you continue to have problems,{' '}
                    <a
                      href={`mailto:support@myfreightweb.com?subject=Error Help&message=${this.state.error}`}
                    >
                      contact us
                    </a>
                    .
                  </p>
                </Container>
              </Flex.Column>
              <Flex.Column style={{ zIndex: 0 }}>{props.children}</Flex.Column>
            </Flex>
          </Container>
        </>
      );
    }

    return props.children;
  }
}

export default withRouter(ErrorBoundary);

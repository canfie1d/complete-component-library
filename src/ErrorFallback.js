import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Hero from './Hero';
import Image from './Image';
import Button from './Button';
import Container from './layout/Container';
import Flex from './layout/Flex';

const ErrorFallback = props => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      props.handleError();
    }
  }, [loading]); //eslint-disable-line

  return (
    <>
      <Hero headerText='Network Error'>
        <p>Sorry for the interuption- we ran into a network error.</p>
      </Hero>
      <Container asSegment basic>
        <Flex justify='space-around' wrap>
          <Flex.Column textAlign='center' style={{ zIndex: 1 }}>
            <Container style={{ background: '#f9f9f9', padding: '1em' }} text>
              <p>
                We've logged the error on our end so our engineers can take a
                look.
              </p>
              <p>Refresh the page to try again.</p>
              <Button primary onClick={() => history.replace()}>
                Refresh
              </Button>
            </Container>
          </Flex.Column>
          <Flex.Column style={{ zIndex: 0 }}>{props.children}</Flex.Column>
        </Flex>
      </Container>
    </>
  );
};

export default ErrorFallback;

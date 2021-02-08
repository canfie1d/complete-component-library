import React, { useEffect } from 'react';
import { useUnauthenticatedAxios, useAxios } from './hooks/useAxios';
import { useHistory, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import { Image, Button } from 'semantic-ui-react';
import Container from './components/layout/Container';
import Flex from './components/layout/Flex';
import Image1 from './assets/svg/illustrations/stacked-logos.svg';

const ErrorFallback = (props) => {
  const history = useHistory();
  const location = useLocation();
  // eslint-disable-next-line
  const [{}, errorApi] = useUnauthenticatedAxios(
    { url: `/v1/quoted/logs`, method: 'post' },
    { manual: true }
  );
  const [{ loading: userLoading, data: userData }] = useAxios(`/v1/userd/user`);

  useEffect(() => {
    if (!userLoading) {
      errorApi({
        data: {
          error: props.error.message,
          errorLocation: location.pathname,
          accountId: userData?.user ? userData?.user.accountId : 'n/a',
          userId: userData?.user ? userData?.user.id : 'n/a',
        },
      });
    }
  }, [userLoading]); //eslint-disable-line

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
          <Flex.Column style={{ zIndex: 0 }}>
            <Image centered size='medium' src={Image1} />
          </Flex.Column>
        </Flex>
      </Container>
    </>
  );
};

export default ErrorFallback;

import { useEffect, useContext } from 'react';
import { Context } from '../contexts/AppStore';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { useAuth0 } from '../services/auth';

const PrivateRoute = ({
  exact,
  path,
  permissions,
  fallbackRedirect,
  component: Component,
}) => {
  const {
    loading: authLoading,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  const [appState] = useContext(Context);

  useEffect(() => {
    if (!authLoading && !isAuthenticated && !fallbackRedirect) {
      loginWithRedirect({
        appState: {
          target: path,
        },
      });
    }
  }, [authLoading, isAuthenticated, fallbackRedirect]); //eslint-disable-line

  if (
    (!permissions && isAuthenticated) ||
    authLoading ||
    (!fallbackRedirect && !isAuthenticated)
  ) {
    return (
      <Loader size='large' active>
        Loading...
      </Loader>
    );
  }

  // if (!authLoading && isAuthenticated && state.user.isDriverAccount) {
  //   return <SubdomainRedirect subdomain='driver' port='3003' to='/trips' />;
  // }

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        !isAuthenticated && fallbackRedirect ? (
          <Redirect to={fallbackRedirect} />
        ) : (
          <Component permissions={appState.permissions} {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;

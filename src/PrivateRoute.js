import { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from './Loader';

const PrivateRoute = ({
  loading,
  loaderText,
  fallbackRedirect,
  authenticated,
  exact,
  path,
  component: Component,
}) => {
  useEffect(() => {
    if (!loading && !authenticated && !fallbackRedirect) {
      props.handleRedirect();
    }
  }, [loading, authenticated]); //eslint-disable-line

  if (loading) {
    return (
      <Loader size='large' active>
        {loaderText}
      </Loader>
    );
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        !authenticated && fallbackRedirect ? (
          <Redirect to={fallbackRedirect} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.defaultProps = {
  loaderText: 'Loading...',
};

PrivateRoute.propsTypes = {
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
  loaderText: PropTypes.string,
  fallbackRedirect: PropTypes.string,
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.node,
};

export default PrivateRoute;

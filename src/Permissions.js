/**
 * Gateway Component that sets the users app permissions in state to be accessed
 * within the app when determining eligibility
 */

import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrevious } from 'react-use';
import { useAxios } from '../hooks/useAxios';
import { Context } from '../contexts/AppStore';
import { useAuth0 } from '../services/auth';

export const Permissions = () => {
  const { loading: authLoading, isAuthenticated } = useAuth0();
  const location = useLocation();
  const [{}, userApi] = useAxios({ url: '/v1/userd/user' }, { manual: true }); // eslint-disable-line
  const [state, dispatch] = useContext(Context); // eslint-disable-line

  const prevAuthLoading = usePrevious(authLoading);
  const authLoadingComplete = prevAuthLoading === true && authLoading === false;

  useEffect(() => {
    if (
      authLoadingComplete &&
      location.pathname !== '/register' &&
      location.pathname !== '/log-in' &&
      location.pathname !== '/home' &&
      location.pathname !== '/available-loads' &&
      location.pathname !== '/survey/:auctionId'
    ) {
      userApi().then((res) => {
        const user = res.data?.user;
        if (user) {
          dispatch({ type: 'SET_USER', payload: user });
        }
        const permissions = user?.actions;
        dispatch({ type: 'SET_PERMISSIONS', payload: permissions });
      });
    }
  }, [authLoadingComplete]); // eslint-disable-line

  useEffect(() => {
    if (isAuthenticated && !state.user.id) {
      userApi()
        .then((res) => {
          const user = res.data?.user;
          dispatch({ type: 'SET_USER', payload: user });
        })
        .catch((err) => {
          /*Silent Error*/
        });
    }
  }, [state.user]); // eslint-disable-line

  return null;
};

export default Permissions;

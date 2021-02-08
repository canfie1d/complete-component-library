import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const AnalyticsListener = (props) => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize(props.gaAuthToken);
  }, []);

  useEffect(() => {
    if (!props.ignoredPages.find(location.pathname)) {
      ReactGA.pageview(location.pathname);
    }
  }, [location.pathname]); // eslint-disable-line

  return null;
};

AnalyticsListener.defaultProps = {
  ignoredPages: [],
};

export default AnalyticsListener;

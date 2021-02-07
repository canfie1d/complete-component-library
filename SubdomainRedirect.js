/**
 * Similar to SubdomainLink, this component allows redirects across all
 * developement and production environments
 */
import config from '../config';

const SubdomainRedirect = props => {
  const urlBase = () => {
    switch (config.baseEnv) {
      case 'prod':
        return `https://${props.subdomain}.myfreightweb.com`;
      case 'staging':
        return `https://${props.subdomain}-staging.myfreightweb.com`;
      case 'dev':
      default:
        return `http://localhost:${props.port}`;
    }
  };

  const href = `${urlBase()}${props.to}`;
  window.location = href;
  return null;
};

SubdomainRedirect.defaultProps = {
  port: '3001',
  subdomain: 'driver',
};

export default SubdomainRedirect;

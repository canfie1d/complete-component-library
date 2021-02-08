const SubdomainRedirect = (props) => {
  const urlBase = () => {
    switch (props.baseEnv) {
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
  baseEnv: 'dev',
  port: '3001',
  subdomain: 'driver',
};

export default SubdomainRedirect;

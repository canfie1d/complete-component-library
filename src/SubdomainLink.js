const SubdomainLink = (props) => {
  let port = window.location.port;
  const urlBase = () => {
    switch (props.baseEnv) {
      case 'prod':
        return 'https://myfreightweb.com';
      case 'staging':
        return 'https://staging.myfreightweb.com';
      case 'dev':
      default:
        if (port === '3001') {
          return 'http://localhost:3000';
        }
        return 'http://localhost:3001';
    }
  };

  const href = `${urlBase()}${props.to}`;

  return (
    <a
      className={props.className}
      href={href}
      target={props.target}
      rel={props.rel}
    >
      {props.children}
    </a>
  );
};

SubdomainLink.defaultProps = {
  baseEnv: 'dev',
  target: 'self',
  rel: '',
};

export default SubdomainLink;

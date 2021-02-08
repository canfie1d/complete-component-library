const Footer = () => {
  return (
    <footer className='footer'>
      <p>
        &copy; 2020, FreightWeb •{' '}
        <a
          href='https://fw-carrier-portal-assets.s3.amazonaws.com/FWS_User_Agreement.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          Terms of Service
        </a>{' '}
        •{' '}
        <a
          href='https://fw-carrier-portal-assets.s3.amazonaws.com/FWS_Privacy_Policy.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          Privacy Policy
        </a>
      </p>
    </footer>
  );
};

export default Footer;

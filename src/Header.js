/**
 * The main application header that holds some display logic for navigation based on screen size
 */

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container, Image } from 'semantic-ui-react';
import Nav from './Nav';
import MobileNav from './MobileNav';

import fwLogoSvg from '../assets/svg/FW-logo-horizontal-color.svg';
import smallFwLogoSvg from '../assets/svg/FW-icon-color.svg';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Context } from '../contexts/AppStore';

const Header = props => {
  const [state] = useContext(Context); // eslint-disable-line

  const mediaQuery = useMediaQuery();
  const isSmallScreen =
    mediaQuery === 'xSmall' ||
    mediaQuery === 'small' ||
    mediaQuery === 'medium';

  const renderLogo = () => {
    if (mediaQuery === 'xSmall' || mediaQuery === 'small') {
      return (
        <Menu.Item
          as={NavLink}
          to='/'
          style={{ position: 'relative', padding: '1.25em' }}
        >
          <Image
            src={smallFwLogoSvg}
            style={{ height: '50px', width: '50px' }}
            alt='FreightWeb logo'
            fluid
          />
        </Menu.Item>
      );
    }

    return (
      <Menu.Item as={Link} to='/' style={{ padding: '0 0 0 1.25em' }}>
        <Image
          src={fwLogoSvg}
          style={{ height: '50px', width: '175px' }}
          alt='FreightWeb logo'
          fluid
        />
        <p
          style={{
            position: 'absolute',
            top: 'calc(100% - 16px)',
            left: '130px',
            fontSize: '.7em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Carrier {state.user?.accountType === 'pro' ? 'Pro' : ''}
        </p>
      </Menu.Item>
    );
  };

  return (
    <header className='app-header'>
      <Menu text size='huge' as='nav'>
        <Container>
          {renderLogo()}
          {isSmallScreen ? <MobileNav /> : <Nav />}
        </Container>
      </Menu>
    </header>
  );
};

export default Header;

import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Menu from '../Menu';
import Container from './Container';
import Nav from '../Nav';
import Image from '../Image';
import MobileNav from '../MobileNav';
import { useMediaQuery } from '../util/useMediaQuery';

const Header = props => {
  return (
    <header className='app-header'>
      <Menu text size='huge' as='nav'>
        <Container>
          {props.children}
          {props.isSmallScreen ? <MobileNav /> : <Nav />}
        </Container>
      </Menu>
    </header>
  );
};

export default Header;

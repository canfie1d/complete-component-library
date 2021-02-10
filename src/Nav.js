import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MenuNav from './MenuNav';
import Icon from './Icon';
import Flex from './layout/Flex';

const Nav = props => {
  const [navOpen, setNavOpen] = useState(false);

  const renderNavItems = () => {
    return items.map(item => (
      <NavLink
        style={{ padding: '.5em' }}
        to={item.to}
        onClick={() => setNavOpen(false)}
        exact
      >
        {item.text}
      </NavLink>
    ));
  };

  return (
    <Flex
      className='nav'
      justify={position === 'right' ? 'flex-end' : 'flex-start'}
    >
      <Flex.Column grow={0}>
        {renderNavItems()}
        {props.children}
      </Flex.Column>
    </Flex>
  );
};

export default Nav;

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuNav from './MenuNav';
import Flex from './layout/Flex';
import Icon from './Icon';

const MobileNav = ({ items, position }) => {
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
    <Flex justify={position === 'right' ? 'flex-end' : 'flex-start'}>
      <Flex.Column grow={0}>
        <MenuNav setNavOpen={() => setNavOpen(!navOpen)} navOpen={navOpen}>
          {renderNavItems()}
          {props.children}
        </MenuNav>
      </Flex.Column>
    </Flex>
  );
};

MobileNav.PropTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
  position: PropTypes.oneOf(['left', 'right']),
};

export default MobileNav;

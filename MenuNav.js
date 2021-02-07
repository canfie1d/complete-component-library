/**
 * Main navigation menu component for the app
 * Triggered by the hamburger icon in the header
 */

import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';
import { useClickAway } from 'react-use';
import { useMediaQuery } from '../hooks/useMediaQuery';

const MenuNav = props => {
  const mediaQuery = useMediaQuery();
  const isSmallScreen =
    mediaQuery === 'xSmall' ||
    mediaQuery === 'small' ||
    mediaQuery === 'medium';

  const ref = useRef(null);

  useClickAway(ref, () => {
    if (props.navOpen) {
      props.setNavOpen();
    }
  });

  const classes = ['menu-nav', props.navOpen && 'menu-nav--open'];

  return (
    <div ref={ref} style={!isSmallScreen ? { position: 'relative' } : {}}>
      <Button
        size='massive'
        icon='bars'
        className='menu-nav__button'
        onClick={props.setNavOpen}
      />
      <Menu.Menu
        vertical='true'
        secondary='true'
        className={classNames(classes)}
      >
        <div className='menu-nav__content'>{props.children}</div>
      </Menu.Menu>
    </div>
  );
};

MenuNav.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setNavOpen: PropTypes.func.isRequired,
};

export default MenuNav;

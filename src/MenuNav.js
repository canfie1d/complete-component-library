import { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useClickAway } from 'react-use';
import { useMediaQuery } from './util/useMediaQuery';
import Button from './Button';

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
      <div className={classNames(classes)}>
        <ul className='menu-nav__content'>{props.children}</ul>
      </div>
    </div>
  );
};

MenuNav.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setNavOpen: PropTypes.func.isRequired,
};

export default MenuNav;

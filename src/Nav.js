/**
 * The header navigation displayed when on large screen
 */

import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { Menu, Popup } from 'semantic-ui-react';
import MenuNav from './MenuNav';
// import NotificationsMenu from './NotificationsMenu';
import Icon from './Icon';
import Flex from './layout/Flex';

const Nav = props => {
  const { loading, isAuthenticated } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleNavClick = menu => {
    if (menu === 'notifications') {
      setNotificationsOpen(!notificationsOpen);
    } else {
      setNavOpen(!navOpen);
    }
  };

  if (loading) return null;

  if (isAuthenticated) {
    return (
      <Menu.Menu position='right' className='nav'>
        <>
          <Menu.Item
            name='Dashboard'
            as={NavLink}
            to='/'
            exact
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            name='Load Board'
            as={NavLink}
            to='/load-board'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            name='Trips'
            as={NavLink}
            to='/trips'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            name='Broker Directory'
            as={NavLink}
            to='/brokers'
            onClick={() => setNavOpen(false)}
          />
          {/* <NotificationsMenu
            navOpen={notificationsOpen}
            setNavOpen={() => handleNavClick('notifications')}
            onClose={() => setNotificationsOpen(false)}
          /> */}
          <MenuNav
            navOpen={navOpen}
            setNavOpen={() => handleNavClick('navigation')}
          >
            <Menu.Item
              name='Back Office'
              as={NavLink}
              to='/back-office'
              onClick={() => setNavOpen(false)}
            />
            <Menu.Item
              name='Personnel'
              as={NavLink}
              to='/personnel'
              onClick={() => setNavOpen(false)}
            />
            <Menu.Item
              name='Contacts'
              as={NavLink}
              to='/contacts'
              onClick={() => setNavOpen(false)}
            />
            <Flex>
              <Flex.Column>
                <Menu.Item
                  style={{
                    minWidth: 'auto',
                    display: 'block',
                    textAlign: 'center',
                  }}
                  as={NavLink}
                  to='/account'
                  onClick={() => setNavOpen(false)}
                >
                  <span className='visually-hidden'>Account</span>
                  <Popup
                    content='Account'
                    style={{ left: '-0.8em' }}
                    trigger={
                      <Icon name='user-circle-o' style={{ margin: 0 }} />
                    }
                  />
                </Menu.Item>
              </Flex.Column>
              <Flex.Column>
                <Menu.Item
                  style={{
                    minWidth: 'auto',
                    display: 'block',
                    textAlign: 'center',
                  }}
                  as={NavLink}
                  to='/resources'
                  onClick={() => setNavOpen(false)}
                >
                  <span className='visually-hidden'>Resources</span>
                  <Popup
                    content='Resources'
                    style={{ left: '-0.8em' }}
                    trigger={
                      <Icon name='question-circle' style={{ margin: 0 }} />
                    }
                  />
                </Menu.Item>
              </Flex.Column>
              <Flex.Column>
                <Menu.Item
                  style={{
                    minWidth: 'auto',
                    display: 'block',
                    textAlign: 'center',
                  }}
                  as={NavLink}
                  to='/log-out'
                  onClick={() => setNavOpen(false)}
                >
                  <span className='visually-hidden'>Log Out</span>
                  <Popup
                    content='Log Out'
                    position='top right'
                    style={{ left: '0.7em' }}
                    trigger={<Icon name='sign-out' style={{ margin: 0 }} />}
                  />
                </Menu.Item>
              </Flex.Column>
            </Flex>
          </MenuNav>
        </>
      </Menu.Menu>
    );
  }

  return (
    <Menu.Menu position='right' className='nav'>
      <Menu.Item name='Join Now' as={NavLink} to='/register' exact />
      <Menu.Item name='Log In' as={NavLink} to='/log-in' exact />
    </Menu.Menu>
  );
};

export default Nav;

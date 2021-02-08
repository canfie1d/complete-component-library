import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Popup } from 'semantic-ui-react';
import useAuth from '../hooks/useAuth';
import MenuNav from './MenuNav';
import SubdomainLink from './SubdomainLink';
// import NotificationsMenu from './NotificationsMenu';
import Flex from './layout/Flex';
import Icon from './Icon';

const MobileNav = (props) => {
  const { loading, isAuthenticated } = useAuth();
  const [navOpen, setNavOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleNavClick = (menu) => {
    if (menu === 'notifications') {
      setNotificationsOpen(!notificationsOpen);
    } else {
      setNavOpen(!navOpen);
    }
  };

  const renderNavItems = () => {
    if (loading) return null;

    if (isAuthenticated) {
      return (
        <>
          <Menu.Item
            style={{ padding: '.5em' }}
            name='Dashboard'
            as={NavLink}
            to='/'
            onClick={() => setNavOpen(false)}
            exact
          />
          <Menu.Item
            style={{ padding: '.5em' }}
            name='Broker Directory'
            as={NavLink}
            to='/brokers'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            style={{ padding: '.5em' }}
            name='Load Board'
            as={NavLink}
            to='/load-board'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            style={{ padding: '.5em' }}
            name='Trips'
            as={NavLink}
            to='/trips'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            style={{ padding: '.5em' }}
            name='Back Office'
            as={NavLink}
            to='/back-office'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            style={{ padding: '.5em' }}
            name='Personnel'
            as={NavLink}
            to='/personnel'
            onClick={() => setNavOpen(false)}
          />
          <Menu.Item
            style={{ padding: '.5em' }}
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
                  trigger={<Icon name='user-circle-o' style={{ margin: 0 }} />}
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
                as={SubdomainLink}
                to='/resources'
                target='_blank'
                rel='noopener noreferrer'
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
        </>
      );
    }

    return (
      <>
        <Menu.Item
          name='Join Now'
          as={NavLink}
          to='/register'
          onClick={() => setNavOpen(false)}
        />
        <Menu.Item
          name='Log In'
          as={NavLink}
          to='/log-in'
          onClick={() => setNavOpen(false)}
        />
      </>
    );
  };

  return (
    <Flex justify='flex-end'>
      {/* <Flex.Column grow={0}>
        <NotificationsMenu
          navOpen={notificationsOpen}
          setNavOpen={() => handleNavClick('notifications')}
          onClose={() => setNotificationsOpen(false)}
          style={{ marginRight: '4.7em' }}
        />
      </Flex.Column> */}
      <Flex.Column grow={0}>
        <MenuNav
          setNavOpen={() => handleNavClick('navigation')}
          navOpen={navOpen}
        >
          {renderNavItems()}
        </MenuNav>
      </Flex.Column>
    </Flex>
  );
};

export default MobileNav;

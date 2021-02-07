/**
 * Component used to display system notifications to users
 */

import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Flex from './layout/Flex';
import Icon from './Icon';

const Alert = props => {
  let sharedStyles = {
    width: '100%',
    transition: 'transform 200ms ease',
    zIndex: 3,
  };

  sharedStyles = { ...sharedStyles, ...props.style };

  const styles = !props.alert.active
    ? { ...sharedStyles, ...{ transform: 'translateY(0)' } }
    : { ...sharedStyles, ...{ transform: 'translateY(100%)' } };

  const color =
    props.alert.type === 'warning'
      ? 'yellow'
      : props.alert.type === 'error'
      ? 'red'
      : props.alert.type === 'success'
      ? 'green'
      : props.alert.type === 'info'
      ? 'blue'
      : 'grey';

  return (
    <Container text as={Segment} color={color} inverted tertiary style={styles}>
      <Flex justify='space-between'>
        <Flex.Column style={props.topPadding ? { paddingTop: '.5em' } : {}}>
          {props.alert.message && <p>{props.alert.message}</p>}
          {props.children}
        </Flex.Column>
        {props.handleClose && (
          <Flex.Column grow={0}>
            <button
              style={{ color: 'white' }}
              className='button--transparent'
              onClick={props.handleClose}
            >
              <span className='visually-hidden'>Close alert dialog</span>
              <Icon name='close' color='inherit' fitted />
            </button>
          </Flex.Column>
        )}
      </Flex>
    </Container>
  );
};

Alert.defaultProps = {
  style: { position: 'absolute', top: 0, left: 0, right: 0 },
};

export default Alert;

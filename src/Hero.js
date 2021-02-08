/**
 * Component used to display a large image at the top of the viewport with a title
 */

import React from 'react';
import classNames from 'classnames';
import { Image } from 'semantic-ui-react';
import Container from './layout/Container';
import { useMediaQuery } from '../hooks/useMediaQuery';
import Divider from './Divider';
import Flex from './layout/Flex';

const Hero = (props) => {
  const mediaQuery = useMediaQuery();
  const isMobile = mediaQuery === 'xSmall' || mediaQuery === 'small';

  const classes = [
    'hero',
    props.tall && 'hero--tall',
    props.short && 'hero--short',
    isMobile && 'hero--auto',
  ];

  const childStyle = {
    ...(!isMobile && !props.actionButton && { maxWidth: '40%' }),
    ...(!isMobile && props.actionButton && { maxWidth: '50%' }),
  };

  return (
    <div className={classNames(classes)}>
      {props.imgSrc && <Image src={props.imgSrc} className='hero__image' />}
      {props.imgSrc && !props.tall && <div className='hero__image-overlay' />}
      <Container>
        <Flex alignment={props.tall ? 'flex-start' : 'center'} wrap>
          <Flex.Column>
            <h1 className='hero__header'>{props.headerText}</h1>
            {!props.hideDivider && <Divider />}
            {<div style={childStyle}>{props.children}</div>}
          </Flex.Column>
          {props.actionButton && (
            <Flex.Column style={{ marginTop: '1em' }}>
              {props.actionButton}
            </Flex.Column>
          )}
        </Flex>
      </Container>
    </div>
  );
};

export default Hero;

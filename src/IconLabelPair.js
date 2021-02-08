import Flex from './layout/Flex';
import { Header, Image } from 'semantic-ui-react';
import Icon from './Icon';

const IconLabelPair = (props) => {
  return (
    <>
      <Flex
        justify='center'
        alignment='center'
        style={{
          backgroundColor: props.color,
          borderRadius: props.borderRadius,
          width: '250px',
          height: '75px',
        }}
      >
        <Header as='h2' size='small'>
          {!!props.image && (
            <Image
              src={props.image}
              style={{ color: 'white', height: '25px', width: '25px' }}
              alt={props.alt}
            />
          )}
          {!!props.icon && (
            <Icon
              style={{ color: props.textColor }}
              size={props.iconSize}
              name={props.icon}
            />
          )}
          <Header.Content style={{ color: props.textColor }}>
            {props.header}
            <Header.Subheader style={{ color: props.textColor }}>
              {props.subheader}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Flex>
      <p
        style={{
          textAlign: 'left',
          fontStyle: 'italic',
          width: '100%',
        }}
      >
        {props.label}
      </p>
    </>
  );
};

IconLabelPair.defaultProps = {
  borderRadius: '5px',
  textColor: 'white',
  iconSize: 'huge',
};

export default IconLabelPair;

import React from 'react';
import { Button } from 'semantic-ui-react';
import { Input } from 'formik-semantic-ui';
import Flex from '../layout/Flex';
import MoneyInput from './MoneyInput';

const InputArrayItem = props => {
  const renderInput = () => {
    if (props.type === 'money') {
      return (
        <MoneyInput
          name={props.name}
          value={props.values[props.index]}
          onChange={value =>
            props.formikProps.setFieldValue(props.name, value, false)
          }
        />
      );
    }

    if (props.type === 'money-description') {
      return (
        <Flex>
          <Flex.Column basis='20%'>
            <MoneyInput
              name={`${props.name}.amount`}
              value={props.values[props.index].amount}
              onChange={value =>
                props.formikProps.setFieldValue(
                  `${props.name}.amount`,
                  value,
                  false
                )
              }
            />
          </Flex.Column>
          <Flex.Column>
            <Input
              name={`${props.name}.description`}
              inputProps={{ placeholder: 'Description', maxLength: '25' }}
            />
          </Flex.Column>
        </Flex>
      );
    }

    const numberProps =
      props.type === 'number'
        ? {
            type: 'number',
            min: '0',
            step: '1',
          }
        : {};

    return (
      <Input
        name={props.name}
        inputProps={{
          placeholder: props.placeholder,
          maxLength: 40,
          style: { marginTop: '.5em' },
          type: props.type,
          ...numberProps,
        }}
      />
    );
  };
  return (
    <Flex>
      <Flex.Column>{renderInput()}</Flex.Column>
      <Flex.Column grow={0} shrink={0} basis='36px'>
        <Button
          circular
          size='tiny'
          icon='trash'
          type='button'
          style={{ marginTop: '.25em' }}
          disabled={!props.allowLastItemDelete && props.values.length < 2}
          onClick={() => props.arrayHelpers.remove(props.index)}
        />
      </Flex.Column>
    </Flex>
  );
};

InputArrayItem.defaultProps = {
  type: 'text',
};

export default InputArrayItem;

import React from 'react';
import { Button } from 'semantic-ui-react';
import { Input, Dropdown } from 'formik-semantic-ui';
import GeocoderInput from './GeocoderInput';
import Flex from '../layout/Flex';
import { STATES_OPTIONS } from '../../services/constants';

const LocationInput = props => {
  const handleSelection = (
    name = 'location',
    selection,
    fromAddressBook = false
  ) => {
    if (fromAddressBook) {
      props.setFieldValue(name, selection, true);
      return;
    }

    props.setFieldValue(props.namespace, selection, true);
  };

  const handleClearClick = () => {
    const defaultValues = {
      ...props.values,
      ...{
        businessName: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: '',
      },
    };
    props.setFieldValue(props.namespace, defaultValues, true);
  };

  const hasValue = () => {
    const checkedValues = [
      'businessName',
      'line1',
      'line2',
      'city',
      'state',
      'postalCode',
    ];
    return checkedValues.some(value => props.values[value] !== '');
  };

  return (
    <>
      {props.labelText && (
        <label htmlFor={props.id}>
          {props.labelText}
          {(props.requiredFields.includes('line1') ||
            props.requiredFields.includes('line2') ||
            props.requiredFields.includes('businessName')) && (
            <span style={{ color: 'red' }}>*</span>
          )}
        </label>
      )}
      {!hasValue() ? (
        <GeocoderInput
          id={props.id}
          placeholder={props.placeholder}
          handleSelection={handleSelection}
          namespace={props.namespace}
        />
      ) : (
        <>
          <Flex>
            <Flex.Column>
              <Input
                label='Business Name'
                name={`${props.namespace}.businessName`}
                fieldProps={{
                  required: props.requiredFields.includes('businessName'),
                }}
                fluid
              />
            </Flex.Column>
          </Flex>
          <Flex>
            <Flex.Column>
              <Input
                label='Address'
                name={`${props.namespace}.line1`}
                fieldProps={{
                  required: props.requiredFields.includes('line1'),
                }}
                fluid
              />
            </Flex.Column>
            <Flex.Column>
              <Input
                label='Address Cont.'
                name={`${props.namespace}.line2`}
                fieldProps={{
                  required: props.requiredFields.includes('line2'),
                }}
                fluid
              />
            </Flex.Column>
          </Flex>
        </>
      )}
      <Flex>
        <Flex.Column basis='50%'>
          <Input
            label='City'
            name={`${props.namespace}.city`}
            fieldProps={{ required: props.requiredFields.includes('city') }}
            fluid
          />
        </Flex.Column>
        <Flex.Column basis='25%'>
          <Dropdown
            name={`${props.namespace}.state`}
            options={STATES_OPTIONS}
            label='State'
            selection
            fieldProps={{ required: props.requiredFields.includes('state') }}
            inputProps={{
              fluid: true,
              search: true,
              size: 'tiny',
            }}
          />
        </Flex.Column>
        <Flex.Column basis='25%'>
          <Input
            label='Zip Code'
            name={`${props.namespace}.postalCode`}
            fieldProps={{
              required: props.requiredFields.includes('postalCode'),
            }}
            fluid
          />
        </Flex.Column>
      </Flex>
      {hasValue() && (
        <Button
          circular
          size='mini'
          type='button'
          floated='right'
          style={{ marginTop: '.25em' }}
          onClick={handleClearClick}
        >
          Clear Address
        </Button>
      )}
    </>
  );
};

LocationInput.defaultProps = {
  id: 'address',
  name: 'address',
  placeholder: '123 Main St.',
  requiredFields: ['line1', 'city', 'state', 'postalCode'],
};

export default LocationInput;

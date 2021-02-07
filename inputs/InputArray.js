import React from 'react';
import { Button } from 'semantic-ui-react';
import { FieldArray } from 'formik';
import Icon from '../Icon';
import InputArrayItem from './InputArrayItem';
import Flex from '../layout/Flex';

const InputArray = props => {
  const items = props.formikProps.values[props.name];

  const renderAddButton = (arrayHelpers, index) => {
    return (
      <Flex alignment='center' justify='space-between'>
        <Flex.Column grow={0} shrink={0}>
          <Button
            circular
            type='button'
            size='tiny'
            style={{ marginTop: '0.5rem' }}
            aria-label='Add item'
            onClick={() =>
              arrayHelpers.insert(index + 1, props.newItemTemplate)
            }
          >
            <Icon name='plus' />
            Add
          </Button>
        </Flex.Column>
        {props.footerContent && (
          <Flex.Column grow={0}>{props.footerContent}</Flex.Column>
        )}
      </Flex>
    );
  };

  return (
    <div style={props.style}>
      <label htmlFor={props.name}>{props.labelText}</label>
      <FieldArray name={props.name}>
        {arrayHelpers => (
          <>
            {items.map((value, index) => (
              <React.Fragment key={`item-${index}`}>
                <InputArrayItem
                  name={`${props.name}.${index}`}
                  index={index}
                  formikProps={props.formikProps}
                  allowLastItemDelete={props.allowLastItemDelete}
                  arrayHelpers={arrayHelpers}
                  values={props.formikProps.values[props.name]}
                  placeholder={props.newItemPlaceholder}
                  type={props.type}
                />
                {index + 1 === props.formikProps.values[props.name].length &&
                  renderAddButton(arrayHelpers, index)}
              </React.Fragment>
            ))}
            {!items.length && renderAddButton(arrayHelpers, 0)}
          </>
        )}
      </FieldArray>
    </div>
  );
};
export default InputArray;

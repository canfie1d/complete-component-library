import Button from './Button';
import { FieldArray } from 'formik';
import Icon from '../Icon';
import Flex from '../layout/Flex';
import MoneyInput from './MoneyInput';

const InputArray = (props) => {
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
        {(arrayHelpers) => (
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

const InputArrayItem = (props) => {
  const renderInput = () => {
    if (props.type === 'money') {
      return (
        <MoneyInput
          name={props.name}
          value={props.values[props.index]}
          onChange={(value) =>
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
              onChange={(value) =>
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

export default InputArray;

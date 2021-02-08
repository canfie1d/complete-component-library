import { useState } from 'react';
import Flex from '../../layout/Flex';
import EditableInput from './EditableInput';
import Button from '../../Button';
// import Icon from '../../Icon';

const EditableList = (props) => {
  const [initialValue, setInitialValue] = useState(undefined);

  const valueKey = props.valueKey;

  const handleSave = (value, i) => {
    const list = props.values;
    let updatedItem = props.values[i];

    if (valueKey) {
      updatedItem = { ...updatedItem, ...{ [valueKey]: value.value } };
    } else {
      updatedItem = value;
    }

    list[i] = updatedItem;

    props.handleSave({ name: [props.name], value: list });
  };

  return (
    <>
      <Flex direction='column'>
        {!props.values.length && props.initialValue ? (
          <Flex justify='flex-end'>
            {initialValue ? (
              <EditableInput
                name={props.name}
                value={initialValue}
                handleSave={(value) => handleSave(value, 0)}
                handleCancel={() => setInitialValue(undefined)}
                type={props.type}
                hasInitialItem={!!initialValue}
              />
            ) : (
              <Button
                style={{ padding: '.5em .4em .4em', marginRight: 0 }}
                circular
                size='mini'
                icon='plus'
                type='button'
                aria-label='Add'
                onClick={() => {
                  setInitialValue(props.initialValue);
                }}
              />
            )}
          </Flex>
        ) : (
          props.values.map((item, i) => (
            <EditableInput
              key={`item-${i}`}
              name={`item-${i}`}
              value={valueKey ? item[valueKey] : item}
              handleSave={(value) => handleSave(value, i)}
              type={props.type}
            />
          ))
        )}
      </Flex>
      {/* TODO Allow user to add new items */}
      {/* <Button
        circular
        type='button'
        size='mini'
        style={{ margin: 0, padding: '.5em' }}
        aria-label={`Add ${props.label}`}
        onClick={() => props.values.push(props.initialValue)}
      >
        <Icon name='plus' />
        Add
      </Button> */}
    </>
  );
};

export default EditableList;

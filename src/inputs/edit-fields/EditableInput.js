import { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { toMoneyString } from '../../util/util';
import EditableField from './EditableField';
import MoneyInput from '../MoneyInput';
import Flex from '../../layout/Flex';

const EditableInput = (props) => {
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    setNewValue(props.value);
  }, [props.value]);

  const moneyProps =
    props.type === 'money'
      ? {
          icon: 'dollar',
          iconPosition: 'left',
          maxLength: 3,
          type: 'number',
          min: '0.00',
          max: '9.99',
          step: '0.01',
        }
      : {};

  const numberProps =
    props.type === 'number'
      ? {
          type: 'number',
          min: '0',
          step: '1',
        }
      : {};

  const renderViewFromObject = () => {
    const info = Object.keys(props.value).map((key, i) => {
      if (props.type === 'money' && i === 0) {
        return (
          <Flex.Column key={i}>
            <p>{toMoneyString(props.value[key])}</p>
          </Flex.Column>
        );
      }
      return (
        <Flex.Column key={i}>
          <p key={i}>{props.value[key]}</p>
        </Flex.Column>
      );
    });

    return <Flex justify='space-between'>{info}</Flex>;
  };

  const renderInputsFromObject = () => {
    return Object.keys(newValue).map((key, i) =>
      props.type === 'money' && i === 0 ? (
        <MoneyInput
          key={`input-${i}`}
          labelText={props.label}
          size='mini'
          value={newValue[key]}
          onChange={(money) => {
            setNewValue({ ...newValue, ...{ [key]: money } });
          }}
        />
      ) : (
        <Input
          key={`input-${i}`}
          onFocus={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          value={newValue[key]}
          onChange={(e) => {
            e.stopPropagation();
            setNewValue({ ...newValue, ...{ [key]: e.target.value } });
          }}
          size='mini'
          fluid
          {...numberProps}
          label={props.label}
        />
      )
    );
  };

  if (typeof props.value === 'object') {
    return (
      <EditableField
        editingActive={props.editingActive}
        handleSave={() => props.handleSave(newValue)}
        handleCancel={props.handleCancel}
        hasInitialItem={props.hasInitialItem}
      >
        <div view='edit'>{renderInputsFromObject()}</div>
        <div view='view'>{renderViewFromObject()}</div>
      </EditableField>
    );
  }

  return (
    <EditableField
      defaultEditingActive={props.defaultEditingActive}
      handleSave={() => props.handleSave({ name: props.name, value: newValue })}
      handleCancel={props.handleCancel}
      hasInitialItem={props.hasInitialItem}
    >
      <Input
        view='edit'
        fluid
        onFocus={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        value={newValue}
        onChange={(e) => {
          e.stopPropagation();
          setNewValue(e.target.value);
        }}
        size='mini'
        {...moneyProps}
        {...numberProps}
        label={props.label}
      />
      <p view='view'>{props.text || props.value}</p>
    </EditableField>
  );
};

EditableInput.defaultProps = {
  handleCancel: () => {},
};

export default EditableInput;

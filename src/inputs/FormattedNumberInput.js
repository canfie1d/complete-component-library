import { useState } from 'react';
import Input from './Input';

const FormattedNumberInput = (props) => {
  const [displayValue, setDisplayValue] = useState(
    `${props.initialValue}${props.inlineAfter}`
  );

  const handleOnChange = (e) => {
    if (typeof props.touched !== 'undefined') {
      props.touched[props.name] = true;
    }
    let value = e.target.value.replace(/[^0-9]/g, '') || 0;
    if (props.max && value > props.max) return;
    props.setFieldValue(props.name, +value, true);
    setDisplayValue(`${parseInt(value)}${props.inlineAfter}`);
    if (props.allowEmpty && value === 0) {
      setDisplayValue(`${props.initialValue}${props.inlineAfter}`);
    }
  };

  const handleKeydown = (e) => {
    if (props.inlineAfter) {
      const total = e.target.value.length;
      const inlineLength = props.inlineAfter.length;
      if (
        e.key === 'Backspace' &&
        e.target.selectionStart > total - inlineLength
      ) {
        e.preventDefault();
        handleOnChange({
          target: {
            value: e.target.value.substring(0, total - inlineLength - 1),
          },
        });
      }
    }
  };

  const error = props.touched[props.name] && props.errors[props.name];

  return (
    <>
      {props.label && (
        <label style={{ display: 'block' }} htmlFor={props.name}>
          {props.label}
          {props.required && <span style={{ color: '#9f3a38' }}> *</span>}
        </label>
      )}
      <Input
        style={{ width: '100%' }}
        id={props.name}
        name={props.name}
        value={displayValue}
        onChange={handleOnChange}
        onKeyDown={handleKeydown}
        required={props.required}
        {...props.inputProps}
      />
      {error && (
        <span className='sui-error-message'>{props.errors[props.name]}</span>
      )}
    </>
  );
};

FormattedNumberInput.defaultProps = {
  initialValue: '',
};

export default FormattedNumberInput;

import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';

const moneyRegEx = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/);

const MoneyInput = props => {
  const [displayedValue, setDisplayedValue] = useState();
  const [error, setError] = useState();

  let classes = 'field';
  if (props.required) classes = classes + ' required';

  const onChange = data => {
    let isValid = moneyRegEx.test(data.value);

    if (data.value === '') {
      setError();
      props.onChange(0);
      setDisplayedValue(data.value);
    } else if (!isValid) {
      setError('Enter a valid money format');
    } else {
      setError();
      setDisplayedValue(data.value);

      // Manipulate the outgoing value back into an integer
      const formValue = parseFloat(data.value).toFixed(2) * 100;
      props.onChange(formValue);
    }
  };

  useEffect(() => {
    // Manipulate the incoming value into a float with 2 decimal places
    if (props.value) {
      let newDisplayedValue = parseInt(props.value) / 100;
      newDisplayedValue =
        newDisplayedValue.toString().split('.')[1]?.length === 1
          ? newDisplayedValue.toFixed(2)
          : newDisplayedValue;
      setDisplayedValue(newDisplayedValue);
    }
  }, [props.value]);

  return (
    <div style={props.style} className={classes}>
      {props.labelText && (
        <label
          style={{ display: 'block', marginBottom: '0.285rem' }}
          htmlFor={props.name}
        >
          {props.labelText}
        </label>
      )}
      <Input
        id={props.name}
        name={props.name}
        size={props.size}
        disabled={props.disabled}
        value={displayedValue}
        placeholder={props.placeholder}
        onChange={(e, data) => onChange(data)}
        icon='dollar'
        iconPosition='left'
        type='number'
        min='0.00'
        step='0.01'
        fluid
      />
      {error && <span className='sui-error-message'>{error}</span>}
    </div>
  );
};

export default MoneyInput;

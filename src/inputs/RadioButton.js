import { PropTypes } from 'prop-types';

const RadioButton = props => {
  return (
    <span className='radio-button-wrapper'>
      <input
        id={props.id}
        type='radio'
        value={props.value}
        className='radio-button visually-hidden'
        checked={props.checked}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        required={props.required ? true : false}
      />
      <label className='radio-button__label' htmlFor={props.id}>
        <span className='radio-button__custom-box'>
          <span className='radio-button__label__text'>{props.labelText}</span>
        </span>
      </label>
    </span>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  labelText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default RadioButton;

import { PropTypes } from 'prop-types';

const RadioButton = (props) => {
  return (
    <span className='radio-button-wrapper'>
      <input
        id={this.props.id}
        type='radio'
        value={this.props.value}
        className='radio-button visually-hidden'
        checked={this.props.checked}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
        required={this.props.required ? true : false}
      />
      <label className='radio-button__label' htmlFor={this.props.id}>
        <span className='radio-button__custom-box'>
          <span className='radio-button__label__text'>
            {this.props.labelText}
          </span>
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

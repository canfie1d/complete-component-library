import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

const Dropdown = ({
  basic,
  button,
  className,
  compact,
  disabled,
  error,
  fluid,
  floating,
  icon,
  inline,
  item,
  labeled,
  loading,
  multiple,
  pointing,
  search,
  selection,
  scrolling,
  simple,
  trigger,
}) => {
  const [selectedOption, setSelectedOption] = useState();
  const classes = [
    'ui',
    active,
    disabled,
    error,
    basic,
    button,
    compact,
    fluid,
    floating,
    inline,
    item,
    multiple,
    search,
    selection,
    simple,
    scrolling,
    upward,
    'dropdown',
    className,
  ];

  const handleChange = e => {
    const newlySelectedOption = options.find(
      option => option.value === e.target.value
    );

    setSelectedOption(newlySelectedOption);
    props.onChange(newlySelectedOption);
  };

  return (
    <div>
      <label className={classNames(labelClasses)} htmlFor={id}>
        {label}
        {props.required && (
          <span
            style={{
              color: '#db2828',
              margin: '-0.2em 0em 0em 0.2em',
            }}
          >
            *
          </span>
        )}
      </label>
      <select
        id={id}
        className={classNames(classes)}
        disabled={disabled}
        tabIndex={tabIndex}
        options={options}
        value={selectedOption.value}
        onChange={handleChange}
        {...rest}
      />
      {error && <span className='sui-error-message'>{error}</span>}
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  size: PropTypes.number,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  floating: PropTypes.bool,
  fluid: PropTypes.bool,
  onChange: PropTypes.func,
  options: customPropTypes.every([
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
  ]),
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
};

export default Dropdown;

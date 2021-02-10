import PropTypes from 'prop-types';

const Checkbox = ({
  checked,
  disabled,
  id,
  label,
  tabIndex,
  type,
  value,
  onChange,
  labelClassName,
  className,
}) => {
  const inputClasses = [
    'ui',
    checked,
    disabled,
    indeterminate,
    fitted,
    slider,
    toggle,
    'checkbox',
    className,
  ];
  const labelClasses = ['ui', 'label', labelClassName];
  return (
    <div>
      <label className={classNames(labelClasses)} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={classNames(inputClasses)}
        checked={checked}
        disabled={disabled}
        tabIndex={tabIndex}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

Checkbox.defaultProps = {
  type: 'checkbox',
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  value: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.func.bool,
  checked: PropTypes.bool,
};

export default Checkbox;

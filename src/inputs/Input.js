import PropTypes from 'prop-types';

const Input = ({
  className,
  labelClassName,
  label,
  labelPosition,
  children,
  disabled,
  error,
  fluid,
  focus,
  icon,
  iconPosition,
  input,
  inverted,
  loading,
  size,
  transparent,
  type,
}) => {
  const inputClasses = [
    'ui',
    size,
    disabled,
    error,
    fluid,
    focus,
    inverted,
    loading,
    transparent,
    icon,
    labeled,
    'input',
    className,
  ];
  const labelClasses = ['ui', 'label', labelClassName];
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
      <input
        id={id}
        className={classNames(inputClasses)}
        disabled={disabled}
        tabIndex={tabIndex}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <span className='sui-error-message'>{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fluid: PropTypes.bool,
  focus: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  label: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transparent: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  value: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.func.bool,
  checked: PropTypes.bool,
};

export default Input;

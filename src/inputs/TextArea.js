import PropTypes from 'prop-types';

const TextArea = ({
  rows,
  value,
  className,
  labelClassName,
  id,
  required,
  disabled,
  onChange,
  ...rest
}) => {
  const labelClasses = ['ui', 'label', labelClassName];

  const classes = ['ui', 'input', className];

  return (
    <div>
      <label className={classNames(labelClasses)} htmlFor={id}>
        {label}
        {required && (
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
      <textarea
        {...rest}
        id={id}
        className={classNames(classes)}
        onChange={onChange}
        rows={rows}
        value={value}
      />
      {error && <span className='sui-error-message'>{error}</span>}
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  value: PropTypes.string,
};

TextArea.defaultProps = {
  rows: 5,
};

export default TextArea;

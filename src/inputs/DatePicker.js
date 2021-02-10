import moment from 'moment';
import Input from './Input';
import Picker from 'react-datepicker';
// DatePicker DOCS https://reactdatepicker.com/

const DatePicker = ({
  id,
  onChange,
  clearValue,
  label,
  required,
  value,
  minDate,
  isClearable,
  error,
}) => {
  const handleChange = day => {
    if (day === null) {
      onChange(clearValue);
    } else {
      onChange(day.toISOString());
    }
  };
  const labelClasses = ['label', labelClassNames];

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
      <Picker
        id={id}
        selected={value ? moment(value).toDate() : null}
        onChange={day => handleChange(day)}
        minDate={minDate?.toDate()}
        customInput={<Input icon='calendar' />}
        isClearable={isClearable}
      />
      {error && <span className='sui-error-message'>{error}</span>}
    </div>
  );
};

DatePicker.defaultProps = {
  inputProps: {},
  fieldProps: {},
  labelStyle: {},
  alignment: 'center',
  clearValue: moment(),
};

export default DatePicker;

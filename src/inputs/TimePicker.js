import moment from 'moment';
import Picker from 'rc-time-picker';
// import 'rc-time-picker/assets/index.css';

const TimePicker = ({ id, name, label, required, openValue }) => {
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
        className='time-picker'
        format={'h:mm a'}
        showSecond={false}
        use12Hours
        minuteStep={10}
        defaultOpenValue={moment(openValue, 'h:mm a')}
        onChange={time => {
          form.setFieldValue(name, time, true);
        }}
      />
      {error && <span className='sui-error-message'>{form.errors[name]}</span>}
    </div>
  );
};

export default TimePicker;

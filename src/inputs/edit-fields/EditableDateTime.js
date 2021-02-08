import { useState } from 'react';
import moment from 'moment';
import { Input, Checkbox } from 'semantic-ui-react';
import Flex from '../../layout/Flex';
import TimePicker from 'rc-time-picker';
import DatePicker from 'react-datepicker';
import EditableField from './EditableField';

const EditableDateTime = (props) => {
  const [timeVisible, setTimeVisible] = useState(
    moment(props.value).format('hh:mm') !== '12:00'
  );
  const [value, setValue] = useState({
    date: moment(props.value).format('YYYY-MM-DD'),
    time: moment(props.value).format('hh:mm a'),
  });

  const handleDayChange = (day) => {
    const date = moment(day).format('YYYY-MM-DD');
    setValue({ date: date, time: value.time });
  };

  const handleTimeChange = (time) => {
    const formattedTime = moment(time).format('hh:mm a');
    setValue({ date: value.date, time: formattedTime });
  };

  const handleSave = () => {
    let dateTime = moment(value.date).toISOString();
    if (timeVisible) {
      dateTime = moment(`${value.date} ${value.time}`).toISOString();
    }
    props.handleSave({ name: [props.name], value: dateTime });
  };

  return (
    <EditableField
      buttonAlignment='start'
      handleSave={handleSave}
      editVisible={props.editVisible}
      inline={props.inline}
    >
      <Flex view='edit' direction='column'>
        <Flex.Column>
          <div className='editable-datetime'>
            <DatePicker
              id={props.id}
              popperPlacement='bottom-end'
              selected={moment(value.date).toDate()}
              onChange={(day) => handleDayChange(day)}
              minDate={
                props.minDate !== null ? props.minDate.toDate() : props.minDate
              }
              maxDate={
                props.maxDate !== null ? props.maxDate.toDate() : props.maxDate
              }
              customInput={<Input icon='calendar' />}
            />
          </div>
          {!props.hideTimeField && timeVisible && (
            <Flex.Column>
              <TimePicker
                id={props.id}
                className='time-picker'
                format={'hh:mm a'}
                showSecond={false}
                use12Hours
                minuteStep={10}
                defaultValue={moment(props.value)}
                defaultOpenValue={moment(props.value)}
                onChange={(time) => handleTimeChange(time)}
              />
            </Flex.Column>
          )}
          {!props.hideTimeField && (
            <Checkbox
              label='Time'
              checked={timeVisible}
              onChange={(event, data) => {
                setTimeVisible(!timeVisible);
                if (!data.checked)
                  setValue({
                    date: value.date,
                    time: moment(value.date).startOf('day').format('hh:mm a'),
                  });
              }}
            />
          )}
        </Flex.Column>
      </Flex>
      <p view='view'>
        {moment(props.value).format('hh:mm a') === '12:00 am' ||
        props.hideTimeField
          ? moment(props.value).format('l')
          : moment(props.value).format('l hh:mm a')}
      </p>
    </EditableField>
  );
};

EditableDateTime.defaultProps = {
  minDate: moment().startOf('day'),
  maxDate: null,
};

export default EditableDateTime;

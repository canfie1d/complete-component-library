import React, { useState } from 'react';
import moment from 'moment';
import { Checkbox } from 'semantic-ui-react';
import Flex from '../layout/Flex';
import DatePicker from '../inputs/DatePicker';
import TimePicker from '../inputs/TimePicker';

const TIME_PICKER_FORMAT = 'HH:mm';

const DateTimePicker = (props) => {
  const [timeVisible, setTimeVisible] = useState(false);

  return (
    <Flex style={{ marginBottom: '1em' }}>
      <Flex.Column grow={0}>
        <label
          style={{ display: 'block', marginBottom: '0.28571429rem' }}
          htmlFor='date'
        >
          {props.dateLabelText}
        </label>
        <DatePicker
          id={`date ${props.dateName}`}
          name={props.dateName}
          formikProps={props.formikProps}
          minDate={props.minDate}
          inputProps={{
            isOutsideRange: (day) =>
              moment(day).isBefore(moment().startOf('day')),
          }}
          fieldProps={{ required: true }}
          alignment='start'
        />
        <Checkbox
          label={props.timeLabelText}
          onChange={(event, data) => {
            setTimeVisible(data.checked);
            if (!data.checked)
              props.handleUncheckTime && props.handleUncheckTime();
          }}
        />
      </Flex.Column>
      {timeVisible && (
        <Flex.Column grow={0}>
          <TimePicker
            id='time'
            name={props.timeName}
            label={props.timeLabelText}
            openValue='8:00'
            format={TIME_PICKER_FORMAT}
          />
        </Flex.Column>
      )}
    </Flex>
  );
};

DateTimePicker.defaultProps = {
  dateLabelText: 'Date',
  timeLabelText: 'Time',
  minDate: moment().startOf('day'),
};

export default DateTimePicker;

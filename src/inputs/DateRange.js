import Flex from '../layout/Flex';
import * as moment from 'moment';
import DatePicker from './DatePicker';

const DateRange = props => {
  const initialValues = { startDate: props.startDate, endDate: props.endDate };

  return (
    <Flex>
      <Flex.Column>
        <DatePicker
          id={props.startId}
          label={props.startLabel}
          minDate={props.minDate}
          onChange={props.onChange}
          value={props.value}
        />
      </Flex.Column>
      <Flex.Column>
        <DatePicker
          id={props.endId}
          label={props.endLabel}
          onChange={props.onChange}
          value={props.value}
          minDate={props.minDate}
        />
      </Flex.Column>
    </Flex>
  );
};

DateRange.defaultProps = {
  startDate: moment(),
  endDate: moment(),
  startLabel: 'Start Date',
  endLabel: 'End Date',
};

export default DateRange;

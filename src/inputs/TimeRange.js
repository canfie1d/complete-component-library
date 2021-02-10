import TimePicker from './TimePicker';
import Flex from '../layout/Flex';

const FORMAT = 'HH:mm';

const TimeRange = props => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Flex direction={props.stacked ? 'column' : 'row'}>
        <Flex.Column>
          <TimePicker
            id={props.id + '_open'}
            value={props.value}
            onChange={props.onChange}
            label='Open Time'
            openValue='8:00'
            format={FORMAT}
          />
        </Flex.Column>
        <Flex.Column>
          <TimePicker
            id={props.id + '_close'}
            value={props.value}
            onChange={props.onChange}
            label='Close Time'
            openValue='17:00'
            format={FORMAT}
          />
        </Flex.Column>
      </Flex>
      {error && <span className='sui-error-message'>{props.error}</span>}
    </div>
  );
};

export default TimeRange;

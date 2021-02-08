import Flex from '../layout/Flex';
import { Form } from 'formik-semantic-ui';
import * as moment from 'moment';
import DatePicker from './DatePicker';
import FormikEffect from '../forms/FormikEffect';

const DateRange = (props) => {
  const initialValues = { startDate: props.startDate, endDate: props.endDate };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={() => {}}
      ignoreLoading
      render={(formikProps) => (
        <>
          <FormikEffect
            values={formikProps.values}
            onChange={props.handleChange}
            triggers={['startDate', 'endDate']}
          />
          <Flex>
            <Flex.Column>
              <DatePicker
                id='startDate'
                name='startDate'
                label='Start Date'
                formikProps={formikProps}
                labelStyle={{ display: 'block', marginBottom: '5px' }}
              />
            </Flex.Column>
            <Flex.Column>
              <DatePicker
                id='endDate'
                name='endDate'
                label='End Date'
                formikProps={formikProps}
                labelStyle={{ display: 'block', marginBottom: '5px' }}
                minDate={moment(formikProps.values.startDate)}
              />
            </Flex.Column>
          </Flex>
        </>
      )}
    />
  );
};

DateRange.defaultProps = {
  startDate: moment(),
  endDate: moment(),
};

export default DateRange;

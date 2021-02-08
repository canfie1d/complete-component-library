/**
 * Source: https://github.com/turner-industries/formik-semantic-ui/blob/master/example/src/custom/DatePicker.js
 */

import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import FormikTimePicker from './TimePicker';
import Flex from '../layout/Flex';

const FORMAT = 'HH:mm';

const TimeRange = (props) => {
  return (
    <Field name={props.name}>
      {({ form }) => {
        const error = form.touched[props.name] && form.errors[props.name];
        return (
          <Form.Field error={!!error} {...props.fieldProps}>
            {!!props.label && <label htmlFor={props.id}>{props.label}</label>}
            <div>
              <Flex direction={props.stack ? 'column' : 'row'}>
                <Flex.Column>
                  <FormikTimePicker
                    id={props.id + '_open'}
                    name={`${props.namespace}.open`}
                    label='Open Time'
                    openValue='8:00'
                    format={FORMAT}
                  />
                </Flex.Column>
                <Flex.Column>
                  <FormikTimePicker
                    id={props.id + '_close'}
                    name={`${props.namespace}.close`}
                    label='Close Time'
                    openValue='17:00'
                    format={FORMAT}
                  />
                </Flex.Column>
              </Flex>
              {error && (
                <span className='sui-error-message'>
                  {form.errors[props.name]}
                </span>
              )}
            </div>
          </Form.Field>
        );
      }}
    </Field>
  );
};

TimeRange.defaultProps = {
  id: 'field_timerange_alt',
  fieldProps: {},
};

export default TimeRange;

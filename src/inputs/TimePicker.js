/**
 * Source: https://github.com/turner-industries/formik-semantic-ui/blob/master/example/src/custom/DatePicker.js
 */

import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const FormikTimePicker = ({ id, name, label, openValue, fieldProps }) => {
  return (
    <Field name={name}>
      {({ form }) => {
        const error = form.touched[name] && form.errors[name];
        return (
          <Form.Field error={!!error} {...fieldProps}>
            {!!label && <label htmlFor={id}>{label}</label>}
            <TimePicker
              id={id}
              className='time-picker'
              format={'h:mm a'}
              showSecond={false}
              use12Hours
              minuteStep={10}
              defaultOpenValue={moment(openValue, 'h:mm a')}
              onChange={(time) => {
                form.setFieldValue(name, time, true);
              }}
            />
            {error && (
              <span className='sui-error-message'>{form.errors[name]}</span>
            )}
          </Form.Field>
        );
      }}
    </Field>
  );
};

FormikTimePicker.defaultProps = {
  id: `field_timepicker_alt`,
  fieldProps: {},
};

export default FormikTimePicker;

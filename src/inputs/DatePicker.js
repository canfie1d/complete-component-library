import React from 'react';
import moment from 'moment';
import { Field } from 'formik';
import DatePicker from 'react-datepicker';
import { Input } from 'semantic-ui-react';
import Flex from '../layout/Flex';

// DatePicker DOCS https://reactdatepicker.com/

const FormikDatePicker = (props) => {
  const handleDayChange = (day) => {
    if (day === null) {
      props.formikProps.setFieldValue(props.name, props.clearValue, true);
    } else {
      props.formikProps.setFieldValue(props.name, day.toISOString(), true);
    }
  };

  return (
    <>
      {!!props.label && (
        <label htmlFor={props.id} style={props.labelStyle}>
          {props.label}
        </label>
      )}
      <Field name={props.name}>
        {({ field, form, meta }) => (
          <Flex alignment={props.alignment} direction='column'>
            <DatePicker
              id={props.id}
              selected={field.value ? moment(field.value).toDate() : null}
              onChange={(day) => handleDayChange(day)}
              minDate={props.minDate?.toDate()}
              customInput={<Input icon='calendar' style={{ marginRight: 0 }} />}
              isClearable={props.isClearable}
            />
            {meta.error && (
              <span className='sui-error-message'>{meta.error}</span>
            )}
          </Flex>
        )}
      </Field>
    </>
  );
};

FormikDatePicker.defaultProps = {
  id: 'field_datepicker_alt',
  inputProps: {},
  fieldProps: {},
  labelStyle: {},
  alignment: 'center',
  clearValue: moment(),
};

export default FormikDatePicker;

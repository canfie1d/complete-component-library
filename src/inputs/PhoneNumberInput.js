import classNames from 'classnames';
import { Form, Input } from 'semantic-ui-react';
import { Field } from 'formik';
import { formatPhoneNumber } from '../../services/util';

const PhoneNumberInput = ({
  name,
  label,
  className,
  validate,
  required,
  inlineAfter = '',
  inputProps = {},
  fieldProps = {},
}) => {
  const { onChange, ...safeInputProps } = inputProps;

  return (
    <Field name={name} validate={validate}>
      {({ field, form }) => {
        // check error, use the name to split the parent and child element
        let error = undefined;
        // find root name if nested
        const splitName = name.split('.');

        if (splitName.length === 1) {
          error = form.errors && form.errors[name];
        } else {
          error = form.errors?.[splitName[splitName.length - 1]];
        }

        const _onChange = (e) => {
          // replace all non number characters
          let v = e.target.value.replace(/[^0-9]/g, '') || '';

          // if the length is larger than 10, slice it down to 10
          if (v.length > 10) {
            v = v.slice(0, 10);
          }

          // set the value on the form
          form.setFieldValue(name, v);
          onChange && onChange(e);
        };

        const _onKeydown = (e) => {
          // allow backspace to ignore the special characters
          if (e.key === 'Backspace') {
            let num = e.target.value.replace(/[^0-9]/g, '');
            e.preventDefault();
            _onChange({
              target: {
                value: num.substring(0, num.length - 1),
              },
            });
          }
        };

        const _onBlur = (e) => {
          form.validateForm(form.values);
        };

        // Beautify the phone number for the user
        const displayValue = field.value
          ? `${formatPhoneNumber(field.value)}`
          : '';

        const classes = ['field', required && 'required'];

        return (
          <Form.Field error={!!error} className={className} {...fieldProps}>
            {!!label && (
              <div className={classNames(classes)} style={{ margin: 0 }}>
                <label
                  style={{ display: 'block', marginBottom: '0.28571429rem' }}
                  htmlFor={'field_input_' + name}
                >
                  {label}
                  {fieldProps.required && (
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
              </div>
            )}
            <Input
              name={name}
              id={'field_input_' + name}
              value={displayValue}
              onChange={_onChange}
              onKeyDown={_onKeydown}
              onBlur={_onBlur}
              {...safeInputProps}
            />
            {error && <span className='sui-error-message'>{error}</span>}
          </Form.Field>
        );
      }}
    </Field>
  );
};

export default PhoneNumberInput;

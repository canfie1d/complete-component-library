import Input from './Input';
import { formatPhoneNumber } from '../util/util';

const PhoneNumberInput = ({
  name,
  label,
  className,
  validate,
  required,
  ...rest
}) => {
  const [value, setValue] = useState(formatPhoneNumber(props.value));

  const onChange = e => {
    props.onChange(e);
    const val = e.target.value;
    const formattedVal = formatPhoneNumber(val);
    setValue(formattedVal);
  };

  return (
    <Input
      id={props.id}
      label={props.label}
      labelClassName={props.labelClassName}
      className={props.className}
      error={props.error}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default PhoneNumberInput;

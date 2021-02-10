import RadioButton from './RadioButton';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

const RadioButtonGroup = props => {
  const onChange = e => {
    const id = props.id ? props.id : e.target.id;
    const value = { id: id, value: e.target.value };

    props.onChange(value);
  };

  const renderLegend = () => {
    if (props.legend) {
      return <legend className='radio-group__legend'>{props.legend}</legend>;
    }
  };

  // renderRadioButtons expects to have props.options - it takes a list
  // of options and renders the radio buttons for those:
  // props.options = [ { id, value, labelText }, ... ]
  const renderRadioButtons = () => {
    const options = props.options;

    const domOptions = options.map((radio, i) => {
      const id = props.id ? `${props.id}-${radio.id}` : radio.id;
      const checked = radio.value === props.selectedRadio;
      const label = radio.icon ? (
        <Icon name={radio.labelText} color={checked ? 'white' : 'core-dark'} />
      ) : (
        radio.labelText
      );

      return (
        <RadioButton
          key={`radio-${i}`}
          id={id}
          value={radio.value}
          checked={checked}
          labelText={label}
          onChange={onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          required={props.required ? true : false}
        />
      );
    });

    return domOptions;
  };

  const classes = ['radio-button-group', props.className && props.className];

  return (
    <React.Fragment>
      <fieldset id={props.id} className='radio-button-group-fieldset'>
        {renderLegend()}
        <div className={classNames(classes)}>{renderRadioButtons()}</div>
      </fieldset>
    </React.Fragment>
  );
};

RadioButtonGroup.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  required: PropTypes.string,
  legend: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  selectedRadio: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
};

RadioButtonGroup.defaultProps = {
  selectedRadio: '',
};

export default RadioButtonGroup;

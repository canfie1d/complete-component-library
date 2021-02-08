import RadioButton from './RadioButton';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

const RadioButtonGroup = props => {
  onChange = (e) => {
    const id = this.props.id ? this.props.id : e.target.id;
    const value = { id: id, value: e.target.value };

    this.props.onChange(value);
  };

  renderLegend() {
    if (this.props.legend) {
      return (
        <legend className='radio-group__legend'>{this.props.legend}</legend>
      );
    }
  }

  // renderRadioButtons expects to have this.props.options - it takes a list
  // of options and renders the radio buttons for those:
  // this.props.options = [ { id, value, labelText }, ... ]
  renderRadioButtons() {
    const options = this.props.options;

    const domOptions = options.map((radio, i) => {
      const id = this.props.id ? `${this.props.id}-${radio.id}` : radio.id;
      const checked = radio.value === this.props.selectedRadio;
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
          onChange={this.onChange}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          required={this.props.required ? true : false}
        />
      );
    });

    return domOptions;
  }

  render() {
    const classes = [
      'radio-button-group',
      this.props.className && this.props.className,
    ];

    return (
      <React.Fragment>
        <fieldset id={this.props.id} className='radio-button-group-fieldset'>
          {this.renderLegend()}
          <div className={classNames(classes)}>{this.renderRadioButtons()}</div>
        </fieldset>
      </React.Fragment>
    );
  }
}

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

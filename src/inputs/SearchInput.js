import classNames from 'classnames';
import Input from './Input';
import Button from '../Button';

const SearchInput = (props) => {
  const classes = ['search-input', props.onClick && 'search-input--onClick'];

  return (
    <>
      <Input
        id='search'
        label={props.label}
        labelClassName={props.labelClassName}
        className={classNames(classes)}
        style={props.style}
        size={props.size}
        type='search'
        loading={props.loading}
        fluid
        iconPosition={props.value.length && !props.onClick ? null : 'left'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        icon={
          props.clearButtonVisible ? (
            <Button
              className='search-button'
              icon='close'
              type='button'
              onClick={props.onClear}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              basic
            />
          ) : props.onClick ? (
            <Button
              className='search-button'
              icon='search'
              type='button'
              onClick={props.onClick}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              primary
            />
          ) : (
            'search'
          )
        }
      />
    </>
  );
};

SearchInput.defaultProps = {
  size: 'small',
};

export default SearchInput;

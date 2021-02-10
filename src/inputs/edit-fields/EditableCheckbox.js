import { useState, useEffect } from 'react';
import EditableField from './EditableField';
import Checkbox from '../Checkbox';
import Icon from '../../Icon';

const EditableCheckbox = props => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <EditableField
      handleSave={() => props.handleSave({ name: props.name, value: checked })}
      handleCancel={props.handleCancel}
    >
      <Checkbox
        view='edit'
        checked={checked}
        onChange={(e, data) => {
          e.stopPropagation();
          setChecked(data.checked);
        }}
        onFocus={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      />
      <p view='view'>{props.checked && <Icon name='check' />}</p>
    </EditableField>
  );
};

export default EditableCheckbox;

import React, { useState } from 'react';
import { TextArea } from 'semantic-ui-react';
import EditableField from './EditableField';

const EditableTextArea = props => {
  const [newValue, setNewValue] = useState(props.value);

  return (
    <EditableField
      handleSave={() => props.handleSave({ name: props.name, value: newValue })}
    >
      <TextArea
        view='edit'
        value={newValue}
        onChange={e => setNewValue(e.target.value)}
      />
      <p view='view'>{props.text || props.value}</p>
    </EditableField>
  );
};

export default EditableTextArea;

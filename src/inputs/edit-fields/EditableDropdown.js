import EditableField from './EditableField';
import { Dropdown } from 'semantic-ui-react';

const EditableDropdown = (props) => {
  return (
    <EditableField handleSave={props.handleSave}>
      <Dropdown
        view='edit'
        id={props.id}
        name={props.name}
        options={props.options}
        defaultValue={props.selectedOption}
        onChange={(e, selection) => props.handleChange(selection)}
      />
      <p view='view'>{props.text}</p>
    </EditableField>
  );
};
export default EditableDropdown;

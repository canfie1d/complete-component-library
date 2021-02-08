import { useState } from 'react';
import classNames from 'classnames';
import { Button } from 'semantic-ui-react';
import Flex from '../../layout/Flex';
import ViewSwitcher from '../../ViewSwitcher';

// This Component serves as a wrapper that adds edit/save functionality
// to the other editable fields (i.e. EditableList, EditableDateTime, EditableList)
const EditableField = (props) => {
  const [editingActive, setEditingActive] = useState(
    props.defaultEditingActive
  );

  const editButtonClasses = [
    'editable-field__edit-button',
    props.editVisible && 'editable-field__edit-button--always-visible',
  ];

  return (
    <Flex
      className='editable-field'
      alignment={props.buttonAlignment}
      justify={props.inline ? 'start' : 'space-between'}
      inline={props.inline}
    >
      <Flex.Column
        grow={0}
        basis={editingActive && !props.inline ? 'calc(100% - 55px)' : 'auto'}
      >
        <ViewSwitcher displayedView={editingActive ? 'edit' : 'view'}>
          {props.children}
        </ViewSwitcher>
      </Flex.Column>
      <Flex.Column grow={0} basis={editingActive ? '55px' : 'auto'}>
        {editingActive ? (
          <>
            <Button
              style={{ padding: '.5em .4em .4em' }}
              circular
              size='mini'
              icon='times'
              type='button'
              aria-label='Cancel'
              onClick={(e) => {
                e.stopPropagation();
                props.handleCancel();
                setEditingActive(false);
              }}
            />
            <Button
              style={{ padding: '.5em .4em .4em', marginRight: 0 }}
              circular
              size='mini'
              icon='check'
              type='button'
              aria-label='Save'
              onClick={(e) => {
                e.stopPropagation();
                props.handleSave();
                setEditingActive(false);
              }}
            />
          </>
        ) : (
          <Button
            key='edit'
            circular
            size='mini'
            icon='pencil'
            type='button'
            aria-label='Edit'
            className={classNames(editButtonClasses)}
            onClick={(e) => {
              e.stopPropagation();
              setEditingActive(true);
            }}
          />
        )}
      </Flex.Column>
    </Flex>
  );
};

EditableField.defaultProps = {
  handleCancel: () => {},
  buttonAlignment: 'center',
  editingActive: false,
};

export default EditableField;

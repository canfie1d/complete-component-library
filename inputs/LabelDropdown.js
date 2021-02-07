import React, { useState, useEffect } from 'react';
import { Label, Dropdown } from 'semantic-ui-react';
import Icon from '../Icon';
import { formatStatusText, getStatusColor } from '../../services/util';

const LabelDropdown = props => {
  const [status, setStatus] = useState(props.initialValue);

  useEffect(() => {
    if (status !== props.initialValue) {
      setStatus(props.initialValue);
    }
  }, [props.initialValue]); // eslint-disable-line

  useEffect(() => {
    if (props.overrideStatus) {
      setStatus(props.overrideStatus);
      props.setOverrideStatus(null);
    }
  }, [props.overrideStatus]); // eslint-disable-line
  const statusOptions = () => {
    return props.options.map((option, i) => {
      return {
        key: i,
        text: option.text,
        value: option.value,
        content: (
          <Label color={getStatusColor(option.value)} content={option.text} />
        ),
      };
    });
  };

  const handleStatusChange = selection => {
    setStatus(selection.value);
    props.onChange(selection);
  };

  return (
    <>
      <label
        style={{ display: 'block', fontSize: '.75em' }}
        htmlFor='label-dropdown'
      >
        {props.label}
      </label>
      <Dropdown
        id='label-dropdown'
        style={{ whiteSpace: 'nowrap' }}
        selectOnNavigation={false}
        trigger={
          <Label color={getStatusColor(status)}>
            {formatStatusText(status)}
          </Label>
        }
        onChange={(e, selection) => handleStatusChange(selection)}
        options={statusOptions()}
        value={status}
        pointing='top left'
        icon={<Icon name='caret-down' />}
      />
    </>
  );
};

export default LabelDropdown;

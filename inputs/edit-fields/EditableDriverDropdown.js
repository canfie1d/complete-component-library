import React, { useEffect, useState } from 'react';
import { useAxios } from '../../../hooks/useAxios';
import EditableDropdown from './EditableDropdown';

const EditableDriverDropdown = props => {
  const [selectedDriver, setSelectedDriver] = useState(props.selectedDriver);
  const [{ data: driversData }] = useAxios('/v1/quoted/driver', {
    useCache: false,
  });

  const drivers = driversData?.drivers;
  const formattedDrivers = drivers?.map(driver => ({
    text: `${driver.firstName} ${driver.lastName}`,
    value: driver.id,
  }));

  useEffect(() => {
    if (formattedDrivers !== undefined && selectedDriver === null)
      setSelectedDriver(formattedDrivers[0]);
  }, [formattedDrivers]); // eslint-disable-line

  const handleSave = () => {
    const rawDriver = drivers.find(
      driver => driver.id === selectedDriver.value
    );
    props.handleSave(rawDriver);
  };

  return (
    <EditableDropdown
      id={props.id}
      name={props.name}
      options={formattedDrivers}
      selectedOption={selectedDriver?.value}
      handleChange={setSelectedDriver}
      handleSave={handleSave}
      text={props.text}
    />
  );
};

EditableDriverDropdown.defaultProps = {
  id: 'driver',
  name: 'driver',
  selectedDriver: null,
};

export default EditableDriverDropdown;

import { useEffect } from 'react';
import { useGeolocation } from 'react-use';

const Geolocation = props => {
  const geolocation = useGeolocation();

  useEffect(() => {
    // Only execute if different from known location
    if (
      geolocation?.latitude !== props.location.latitude ||
      geolocation?.longitude !== props.location.longitude
    ) {
      props.updateLocation && props.updateLocation(geolocation);
    }
  }, [geolocation, props.location]);

  return null;
};

export default Geolocation;

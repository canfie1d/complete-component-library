import React from 'react';
import config from '../../config';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';

const Map = props => {
  return (
    <ReactMapGL
      {...props.viewport}
      width={props.width}
      height={props.height}
      style={props.style}
      padding={props.padding}
      transitionDuration={150}
      transitionInterpolator={new FlyToInterpolator()}
      onViewportChange={props.onViewportChange}
      mapboxApiAccessToken={config.mapboxAccessToken}
      onLoad={props.onLoad}
    >
      {props.children}
    </ReactMapGL>
  );
};

Map.defaultProps = {
  viewport: {
    latitude: 37.929598, // US off-centered
    longitude: -110.297408,
    zoom: 3,
  },
};

export default Map;

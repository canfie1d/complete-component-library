import { useState, useEffect, useRef } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import { useWindowSize } from '../../hooks/util';
import bbox from '@turf/bbox';
import config from '../../config';
import Icon from '../Icon';

const MarkerMap = (props) => {
  const mapRef = useRef(null);
  const windowSize = useWindowSize(); // refire on window size change
  const [viewport, setViewport] = useState(props.viewport);

  useEffect(() => {
    if (!mapRef || !mapRef.current) return; // unmounted
    if (!props.markers) return;

    let polygonPoints = props.markers.map((point) => [point[1], point[0]]);

    let polygon = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [polygonPoints],
      },
    };

    const [minLng, minLat, maxLng, maxLat] = bbox(polygon);

    const {
      width,
      height,
    } = mapRef.current.getMap().getContainer().getBoundingClientRect();
    const mercatorView = new WebMercatorViewport({
      ...viewport,
      width,
      height,
    });
    const { longitude, latitude, zoom } = mercatorView.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: props.padding || 80 }
    );

    setTimeout(() => {
      setViewport({
        ...viewport,
        longitude,
        latitude,
        maxZoom: props.maxZoom,
        zoom,
      });
    }, 100);
  }, [mapRef, windowSize, props.markers]); // eslint-disable-line

  const renderMarkers = () => {
    if (!props.markers) return;

    return props.markers.map((marker, index) => {
      const iconStyles = {
        width: props.markerSize === 'big' ? '20px' : '36px',
        margin: 0,
        transform:
          props.activeMarkerIndex === index ? 'scale(1.25)' : 'scale(1)',
        transformOrigin: 'bottom',
        transition: 'transform ease-in 200ms, color ease-in 200ms',
      };

      return (
        <Marker
          key={`marker-${index}`}
          latitude={marker[0]}
          longitude={marker[1]}
          offsetLeft={-10}
          offsetTop={props.markerSize === 'big' ? -30 : -54}
        >
          <button
            type='button'
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              padding: '0',
              cursor: 'pointer',
              outline: 'none',
            }}
            onClick={() => props.setActiveMarkerIndex(index)}
            aria-hidden
          >
            <Icon
              name='map-marker'
              color={props.activeMarkerIndex === index ? 'green' : 'blue'}
              size={props.markerSize}
              style={iconStyles}
            />
            {props.getStaticIndex && (
              <span
                style={{
                  position: 'absolute',
                  top: '.5em',
                  left: '.5em',
                  padding: '8px 6px',
                  background: '#2185d0',
                  borderRadius: '50%',
                  color: '#fff',
                }}
              >
                {props.getStaticIndex(index)}
              </span>
            )}
          </button>
        </Marker>
      );
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      width={props.width}
      height={props.height}
      style={props.style}
      padding={props.padding}
      transitionDuration={150}
      onClick={props.onClick}
      transitionInterpolator={new FlyToInterpolator()}
      onViewportChange={setViewport}
      mapboxApiAccessToken={config.mapboxAccessToken}
    >
      {renderMarkers()}
      {props.children}
    </ReactMapGL>
  );
};

MarkerMap.defaultProps = {
  viewport: {
    latitude: 37.929598, // US off-centered
    longitude: -107.297408,
    zoom: 4,
  },
  maxZoom: 9,
  markerSize: 'big',
};

export default MarkerMap;

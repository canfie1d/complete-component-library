import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMapGL, {
  WebMercatorViewport,
  FlyToInterpolator,
  Marker,
} from 'react-map-gl';
import bbox from '@turf/bbox';
import lineLength from '@turf/length';
import along from '@turf/along';
import config from '../../config';
import TruckPinIcon from '../../assets/icons/TruckPinIcon';
import Icon from '../Icon';

import { useWindowSize } from '../../hooks/util';
import { useAxios } from '../../hooks/useAxios';

const RouteMap = props => {
  const mapRef = useRef(null);
  const windowSize = useWindowSize(); // refire on window size change
  const [viewport, setViewport] = useState({
    latitude: 37.929598, // US off-centered
    longitude: -107.297408,
    zoom: 4,
  });
  const [loadComplete, setLoadComplete] = useState(false);
  const [isPainted, setIsPainted] = useState(false);
  const [routeGeoJson, setRouteGeoJson] = useState({
    type: 'LineString',
    coordinates: [],
  });
  const [{}, mapApi] = useAxios({}, { manual: true }); // eslint-disable-line no-empty-pattern

  useEffect(() => {
    if (mapRef.current.getMap().getLayer('route') !== undefined) {
      mapRef.current.getMap().setLayoutProperty('route', 'visibility', 'none');
    }
    if (!!props.coordinates.length) {
      setIsPainted(false);
      setRouteGeoJson({ type: 'LineString', coordinates: [] });
      const directions = props.coordinates
        .map(coord => {
          return `${coord[1]},${coord[0]}`;
        })
        .join('%3B');
      const directionsUrl = `/v1/quoted/directions?stops=${directions}`;
      mapApi({
        url: directionsUrl,
      }).then(res => {
        if (res === undefined) return;
        // let coords = res.data.routes[0].geometry.coordinates;
        let coords = res.data;
        let geojson = { ...{ coordinates: coords }, ...{ type: 'LineString' } };
        setRouteGeoJson(geojson);
      });
    }
  }, [props.coordinates]); // eslint-disable-line

  useEffect(() => {
    // This hook sets the route's viewbox
    if (!mapRef?.current || !props.coordinates.length) return;

    // the  lat/long in feature are used to create the bbox (bounding box)
    const geometries = props.coordinates.map((coord, i) => ({
      type: 'Point',
      coordinates: [coord[1], coord[0]],
    }));

    const feature = {
      type: 'GeometryCollection',
      geometries: geometries,
    };

    // the min/max lat/long are used in creating the mercator view
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);
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
      {
        padding: props.padding,
      }
    );

    // finally the mercator view is combined with the viewport in component state to set the updated map view
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
    });
  }, [windowSize, props.coordinates]); // eslint-disable-line

  const routeCoords = routeGeoJson.coordinates;

  useEffect(() => {
    if (!mapRef?.current || routeGeoJson.coordinates.length === 0) return;
    if (routeGeoJson.coordinates === undefined) return;

    if (!isPainted && loadComplete) {
      setIsPainted(true);

      let route = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: routeGeoJson,
          },
        ],
      };

      const steps = 90;
      const length = lineLength(route.features[0], 'kilometers');
      let line = [];
      for (var i = 0; i < length; i += length / steps) {
        let segment = along(route.features[0], i, 'kilometers');
        line.push(segment.geometry.coordinates);
      }

      route.features[0].geometry.coordinates = [line[0]];

      if (mapRef.current.getMap().getSource('route') === undefined) {
        mapRef.current.getMap().addSource('route', {
          type: 'geojson',
          data: route,
        });
      }
      if (mapRef.current.getMap().getLayer('route') === undefined) {
        mapRef.current.getMap().addLayer({
          id: 'route',
          source: 'route',
          type: 'line',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'line-width': 4,
            'line-color': '#007cbf',
          },
        });
      } else {
        mapRef.current
          .getMap()
          .setLayoutProperty('route', 'visibility', 'visible');
      }

      let counter = 0;

      const animate = () => {
        line[++counter] &&
          route.features[0].geometry.coordinates.push(line[counter]);
        mapRef?.current &&
          mapRef.current.getMap().getSource('route').setData(route);

        if (counter <= steps) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [routeGeoJson, routeCoords, isPainted, loadComplete]);

  const renderMarkers = useCallback(() => {
    if (!props.coordinates.length) return;

    const driverLocationOriginDest = props.coordinates.some(
      coord =>
        props.driverLocation?.latitude === coord[0] &&
        props.driverLocation?.longitude === coord[1]
    );

    const markers = props.coordinates.map((coord, i) => {
      const driverLocationMatch =
        props.driverLocation?.latitude === coord[0] &&
        props.driverLocation?.longitude === coord[1];
      const color = () => {
        if (props.coordinates.length === 2) {
          return i === 0 ? 'green' : 'red';
        } else if (props.coordinates.length === 3) {
          return i === 1 ? 'blue' : i === 0 ? 'green' : 'red';
        } else {
          return i === 1 || i === 2 ? 'blue' : i === 0 ? 'green' : 'red';
        }
      };
      return (
        <Marker
          key={`marker-${i}`}
          latitude={coord[0]}
          longitude={coord[1]}
          offsetLeft={driverLocationMatch ? -20 : -10}
          offsetTop={-30}
        >
          {driverLocationMatch ? (
            <TruckPinIcon color={color()} size='tiny' />
          ) : (
            <Icon
              name='map-marker'
              color={color()}
              size='big'
              style={{ width: '20px', margin: 0 }}
            />
          )}
        </Marker>
      );
    });
    if (props.driverLocation && !driverLocationOriginDest) {
      markers.push(
        <Marker
          key={`marker-driver`}
          latitude={props.driverLocation?.latitude}
          longitude={props.driverLocation?.longitude}
          offsetLeft={-20}
          offsetTop={-30}
        >
          <TruckPinIcon size='tiny' />
        </Marker>
      );
    }
    return markers;
  }, [props.coordinates, props.markers]); // eslint-disable-line

  return (
    <ReactMapGL
      {...viewport}
      ref={mapRef}
      width={props.width}
      height={props.height}
      style={props.style}
      padding={props.padding}
      transitionDuration={150}
      transitionInterpolator={new FlyToInterpolator()}
      onViewportChange={setViewport}
      onLoad={() => setLoadComplete(true)}
      onClick={props.onClick}
      mapboxApiAccessToken={config.mapboxAccessToken}
    >
      {renderMarkers()}
      {props.children}
    </ReactMapGL>
  );
};

RouteMap.defaultProps = {
  padding: 80,
};

export default RouteMap;

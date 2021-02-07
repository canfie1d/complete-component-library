/**
 * This hook is used for all mapbox requests.
 */

import { useState, useEffect } from 'react';
import { geocodingService } from '../services/mapbox';
import { useDebounce } from './util';

const DELAY = 200; // ms

export default (initalQuery = '', types = ['postcode', 'address', 'poi']) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [query, setRawQuery] = useState(initalQuery);
  const debouncedQuery = useDebounce(query, DELAY);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setLoading(false);
      return;
    }

    (async () => {
      const result = await geocodingService
        .forwardGeocode({
          query: debouncedQuery,
          limit: 10,
          countries: ['us', 'ca'],
          language: ['en'],
          types: types,
        })
        .send();
      setResults(result.body.features);
      setLoading(false);
    })();
  }, [debouncedQuery]); //eslint-disable-line

  const setQuery = raw => {
    setLoading(true);
    setRawQuery(raw);
  };
  const clearOptions = () => setResults([]);

  return { results, loading, query, setQuery, clearOptions };
};

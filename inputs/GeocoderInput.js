import React, { useState, useMemo, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'formik-semantic-ui';
import { Select, Popup } from 'semantic-ui-react';
import { ModalContext } from '../../contexts/ModalStore';
import Flex from '../layout/Flex';
import useGeocoder from '../../hooks/useGeocoder';
import Icon from '../Icon';
import { normalizeLocationData } from '../../services/util';

const GeocoderInput = props => {
  const history = useHistory();
  const [state, dispatch] = useContext(ModalContext);
  const { results, loading, setQuery, clearOptions } = useGeocoder(
    '',
    props.types
  );
  const [fullResults, setFullResults] = useState([]);

  const callbackContactType = state.contactBookModal.callback?.contactType;
  const callbackAddress = state.contactBookModal.callback?.address;

  useEffect(() => {
    if (props.defaultQuery) {
      options.push({
        key: `backhaul-${props.defaultQuery.id}`,
        text: props.defaultQuery.postalCode,
        value: props.defaultQuery.id,
      });
      const updatedFullResults = [...fullResults, props.defaultQuery];
      setFullResults(updatedFullResults);

      props.handleSelection(props.namespace, props.defaultQuery, true);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (callbackAddress !== undefined) {
      // Add the address to the list of options so it can be matched to from props.value
      options.push({
        key: `contact-${callbackAddress.id}`,
        text: `${callbackAddress.line1} ${callbackAddress.city}, ${callbackAddress.state} ${callbackAddress.postalCode}`,
        value: callbackAddress.id,
      });
      const updatedFullResults = [...fullResults, callbackAddress];
      setFullResults(updatedFullResults);
      // update the value of the input in the form data
      props.handleSelection(callbackContactType, callbackAddress, true);
      // clear modal callback data
      dispatch({
        type: 'CONTACT_BOOK_MODAL',
        payload: { active: false, data: {}, callback: {} },
      });
    }
  }, [callbackAddress]); // eslint-disable-line

  let options = useMemo(() => {
    // Save the entire results array for later use
    setFullResults(results);

    // Return the text/value pairs of the results for display and selection
    return results.map(result => {
      const name = result.place_name.replace(/, United States$/, '');

      return {
        text: name,
        value: result.id,
      };
    });
  }, [results]);

  const handleChange = (e, dropdownSelection) => {
    // dropdownSelection = the text/value pair
    // fullSelection = the original return shape from the mapbox call
    const fullSelection = fullResults.find(
      result => result.id === dropdownSelection.value
    );
    // normalize the data to match expected form object shape
    const fullNormalizedSelection = normalizeLocationData(fullSelection);
    // update the value of the input in the form data
    props.handleSelection(props.namespace, fullNormalizedSelection);
  };

  const openContactBookModal = () => {
    dispatch({
      type: 'CONTACT_BOOK_MODAL',
      payload: {
        active: true,
        data: { contactType: props.namespace },
        callback: {},
      },
    });
  };

  return (
    <Flex>
      <Select
        id={props.id}
        loading={loading}
        options={options}
        // value allows for displaying the
        // selected value in the geocoder input
        // in the case of LocationInput, the geocoder input is
        // hidden so displaying its value is unnecessary
        value={props.value}
        onChange={handleChange}
        onFocus={clearOptions}
        defaultSearchQuery={
          props.defaultQuery ? props.defaultQuery.postalCode : ''
        }
        search={(options, query) => options}
        onSearchChange={e => {
          if (props.defaultQuery) history.replace();
          setQuery(e.target.value);
        }}
        noResultsMessage='Enter any address'
        autoComplete='off'
        placeholder={props.placeholder}
        style={{
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          borderRight: 'none',
        }}
        selectOnNavigation={false}
        fluid
        basic
      />
      <Popup
        content='Contacts'
        trigger={
          <Button
            icon={<Icon name='address-book-o' />}
            onClick={openContactBookModal}
            style={{
              marginRight: 0,
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            }}
            basic
          />
        }
      />
    </Flex>
  );
};

export default GeocoderInput;

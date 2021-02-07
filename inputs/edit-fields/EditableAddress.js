import React, { useContext, useEffect } from 'react';
import { ModalContext } from '../../../contexts/ModalStore';
import { Button } from 'semantic-ui-react';
import Flex from '../../layout/Flex';

const EditableAddress = props => {
  const [state, dispatch] = useContext(ModalContext); // eslint-disable-line
  const stateCallbackName = state.addressModal.callback.name;
  const stateCallbackData = state.addressModal.callback.data;
  const stateCallbackUpdate = state.addressModal.callback.updateContact;

  useEffect(() => {
    if (stateCallbackData && !props.shipmentError) {
      props.handleSave(
        { name: stateCallbackName, value: stateCallbackData },
        stateCallbackUpdate
      );
      dispatch({
        type: 'ADDRESS_MODAL',
        payload: {
          active: false,
          data: { contactType: props.contactType },
          callback: {},
          error: {},
        },
      });
    }
  }, [stateCallbackData]); // eslint-disable-line

  const openAddressModal = () => {
    dispatch({
      type: 'ADDRESS_MODAL',
      payload: {
        active: true,
        data: { address: props.address },
        callback: { name: props.name },
        error: {},
      },
    });
  };

  return (
    <div className='editable-field'>
      <Flex>
        <Flex.Column>
          {props.address.businessName !== '' && (
            <p style={{ marginBottom: 0 }}>{props.address.businessName}</p>
          )}
          <p
            style={{ marginBottom: 0 }}
          >{`${props.address.line1} ${props.address.line2}`}</p>
          <p>{`${props.address.city} ${props.address.city ? ',' : ''} ${
            props.address.state
          } ${props.address.postalCode}`}</p>
        </Flex.Column>
        <Flex.Column grow={0}>
          <Button
            key='edit'
            circular
            size='mini'
            icon='pencil'
            type='button'
            aria-label='Edit'
            className='editable-field__edit-button'
            onClick={openAddressModal}
          />
        </Flex.Column>
      </Flex>
    </div>
  );
};

export default EditableAddress;

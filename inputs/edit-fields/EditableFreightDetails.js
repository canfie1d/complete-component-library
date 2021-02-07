import React, { useState, useEffect } from 'react';
import { Modal, Button, Segment } from 'semantic-ui-react';
import { Form } from 'formik-semantic-ui';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import FreightForms from '../../forms/FreightForms';
import { formatShipmentContents } from '../../../services/util';
import Flex from '../../layout/Flex';

const DEFAULT_PALLET_ENTRY = { quantity: 1, l: 40, w: 48, h: 48, weight: 0 };

const EditableFreightDetails = props => {
  const [editingActive, setEditingActive] = useState(false);
  const [activeFreightType, setActiveFreightType] = useState(props.name);
  const mediaQuery = useMediaQuery();
  const isSmallScreen = mediaQuery === 'xSmall' || mediaQuery === 'small';
  const initialValues = {
    linearFeet: props.values.linearFeet,
    weight: props.values.weight,
  };
  const defaultActiveIndex = props.name === 'pallet' ? 0 : 1;

  useEffect(() => {
    if (props.shipmentError) {
      setEditingActive(true);
    }
  }, [props.shipmentError]);

  const handleSubmit = (formData, actions) => {
    if (activeFreightType === 'pallet') {
      props.handleSave([
        { name: 'linearFeet', value: 0 },
        { name: 'weight', value: 0 },
        { name: 'pallets', value: formData.pallets },
      ]);
    } else if (activeFreightType === 'linear') {
      const changedValues = [
        { name: 'pallets', value: [DEFAULT_PALLET_ENTRY] },
      ];
      if (formData.linearFeet !== props.values.linearFeet) {
        changedValues.push({
          name: 'linearFeet',
          value: parseInt(formData.linearFeet),
        });
      }
      if (formData.weight !== props.values.weight) {
        changedValues.push({
          name: 'weight',
          value: parseInt(formData.weight),
        });
      }
      props.handleSave(changedValues);
    }
    actions.setSubmitting(false);
    setEditingActive(false);
  };

  return (
    <div className='editable-field'>
      <Modal
        open={editingActive}
        onClose={() => {
          setEditingActive(false);
        }}
      >
        <Modal.Header>{props.modalHeaderText}</Modal.Header>
        {props.shipmentError && (
          <Segment
            style={{ margin: '1em 1em 0' }}
            inverted
            color='red'
            tertiary
          >
            <p>{props.shipmentError.data.error}</p>
          </Segment>
        )}
        <Form
          size='tiny'
          enableReinitialize={true}
          onSubmit={handleSubmit}
          initialValues={{
            pallets: props.values.pallets,
            linearFeet: props.values.linearFeet,
            weight: props.values.weight,
          }}
          render={formikProps => (
            <Form.Children>
              <Modal.Content>
                <FreightForms
                  initialValues={initialValues}
                  isSmallScreen={isSmallScreen}
                  values={formikProps.values}
                  setFieldValue={formikProps.setFieldValue}
                  touched={formikProps.touched}
                  errors={formikProps.errors}
                  DEFAULT_PALLET_ENTRY={DEFAULT_PALLET_ENTRY}
                  updateActiveForm={type => setActiveFreightType(type)}
                  defaultActiveIndex={defaultActiveIndex}
                />
              </Modal.Content>
              <Modal.Actions>
                <Flex justify='space-between' alignment='center'>
                  <Flex.Column grow={0}>
                    <Button
                      basic
                      onClick={() => {
                        setEditingActive(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Flex.Column>
                  <Flex.Column grow={0}>
                    <Button primary type='submit' disabled={!formikProps.dirty}>
                      Save
                    </Button>
                  </Flex.Column>
                </Flex>
              </Modal.Actions>
            </Form.Children>
          )}
        />
      </Modal>
      <Flex>
        <Flex.Column>
          <p style={{ marginBottom: 0 }}>
            {formatShipmentContents(props.values, { short: true })}
          </p>
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
            onClick={() => setEditingActive(true)}
          />
        </Flex.Column>
      </Flex>
    </div>
  );
};

EditableFreightDetails.defaultProps = {
  modalHeaderText: 'Edit Freight Details',
};

export default EditableFreightDetails;

/**
 * An instance of Alert that is displayed at a system level to relay timely information to users
 */

import React, { useContext, useEffect } from 'react';
import { Context } from '../contexts/AppStore';
import Alert from './Alert';

const AlertDialog = props => {
  const [state, dispatch] = useContext(Context);

  const handleClose = () => {
    dispatch({
      type: 'SET_ALERT',
      payload: { active: false, message: '', type: '' },
    });
  };

  useEffect(() => {
    if (state.alert.active) {
      setTimeout(() => {
        handleClose();
      }, 4000);
    }
  }, [state.alert.active]); // eslint-disable-line

  return <Alert alert={state.alert} handleClose={handleClose} topPadding />;
};

export default AlertDialog;

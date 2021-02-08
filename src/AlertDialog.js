import Alert from './Alert';

const AlertDialog = (props) => {
  if (props.active) {
    setTimeout(() => {
      handleClose();
    }, 4000);
  }

  return (
    <Alert alert={props.alert} handleClose={props.handleClose} topPadding />
  );
};

export default AlertDialog;

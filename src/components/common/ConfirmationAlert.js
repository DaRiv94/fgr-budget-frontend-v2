import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (takeAction) => {
    setOpen(false);
    
    if(takeAction){
        props.confirmAction()
    }
  };

  return (
    <div>
      <Button variant="outlined" color={props.buttonColor} onClick={handleClickOpen}>
      {props.buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitle}{}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {props.dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose(false)}} color="primary">
            {props.dialogCancelActionTitle}
          </Button>
          {props.allowConfirm && <Button onClick={()=>{handleClose(true)}} color="primary" autoFocus>
          {props.dialogConfirmActionTitle}
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
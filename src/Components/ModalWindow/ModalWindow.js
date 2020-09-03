import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    '& label.Mui-focused': {
      color: 'rgb(41, 177, 86)',
    },
    '& .MuiDialog-paperWidthSm': {
      padding: '10px',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(41, 177, 86)',
    },
    '& .MuiDialogTitle-root': {
      padding: '5px 5px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(41, 177, 86)',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(41, 177, 86)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(41, 177, 86)',
      },
    },
  },

  button: {
    color: 'rgb(41, 177, 86)',
  },
});

const ModalWindow = (props) => {
  const classes = useStyles();
  const errorTeam=props.context.state.errorTeam;
  const errorResult=props.context.state.errorResult;
  const open=props.context.state.modalWindowOpen;
  const valueTeamHandler=props.context.valueTeamHandler;
  const valueResultHandler=props.context.valueResultHandler;
  const valueTeam=props.context.changingState.inputValueModalWindowOpponent;
  const valueResult=props.context.changingState.inputValueModalWindowResult;
  const handleSaveTeamResult=props.context.handleSaveTeamResult;
  const handleCloseModalWindow=props.context.handleCloseModalWindow;



  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseModalWindow}
        aria-labelledby='form-dialog-title'
        className={classes.root}

      >
        <DialogContentText>
          Введите название команды соперника, результат матча
        </DialogContentText>
        <TextField
          error={errorTeam?true:null}
          className={classes.root}
          fullWidth
          autoFocus
          margin='dense'
          id='outlined-basic'
          variant='outlined'
          label='Название команды'
          type='text'
          value={valueTeam}
          onChange={valueTeamHandler}
          helperText={errorTeam?"Пустое поле":null}
        />
        <TextField
        error={errorResult?true:null}
          className={classes.root}
          fullWidth
          margin='dense'
          id='outlined-basic'
          variant='outlined'
          label='Результат матча'
          type='text'
          value={valueResult}
          onChange={valueResultHandler}
          helperText={errorResult?"Пустое поле":null}
        />
        <DialogActions>
          <Button
            onClick={handleSaveTeamResult}
            variant='outlined'
            className={classes.button}
          >
            Сохранить
          </Button>
          <Button
            onClick={handleCloseModalWindow}
            variant='outlined'
            className={classes.button}
          >
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ModalWindow;

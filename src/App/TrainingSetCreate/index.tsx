import React from 'react';
import {
  TextField,
  makeStyles,
  Input,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import useAPI from './api';
import { Redirect } from 'react-router-dom';
import { Routes } from 'App/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TrainingSetCreate() {
  const classes = useStyles();
  const {
    state,
    actions,
  } = useAPI();
  if (state.isRunning) {
    return (
      <div>
        <p>Now Loading...</p>
      </div>
    )
  }

  if (state.error != null) {
    return (
      <div>
        <p>{JSON.stringify(state.error)}</p>
      </div>
    )
  }

  if (state.data != null) {
    return (
      <Redirect to={Routes.TRAINING_HUB} />
    )
  }
  return (
    <form
      onSubmit={actions.submitForm}
      className={classes.root}
      noValidate
      autoComplete="off">
      <div>
        <FormControl>
          <InputLabel htmlFor="training-set-input-name">Training Set Name</InputLabel>
          <TextField
            id="training-set-input-name"
            label="name"
            type="text"
            value={state.name}
            onChange={evt => actions.changeName(evt.target.value)}
          />
        </FormControl>
        <Input type="submit" value="Submit" />
      </div>
    </form>
  )
}

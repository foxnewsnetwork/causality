import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useTrainingHubAPI from './api';
import { Typography } from '@material-ui/core';
import {
  Route,
  Switch,
  Link,
  useRouteMatch
} from "react-router-dom";
import TrainingSetImages from 'App/TrainingSetImages';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TrainingHub() {
  const classes = useStyles();
  const {
    state
  } = useTrainingHubAPI();
  const { path, url } = useRouteMatch();
  const renderTrainingSet = useCallback((trainingSet) => {
    return (
      // @ts-ignore
      <Link key={`${url}/${trainingSet.id}`} to={`${url}/${trainingSet.id}`}>
        {trainingSet.id}::{trainingSet.name}
      </Link>
    )
  }, [url])

  if (state.loading) {
    return <p>Now Loading...</p>
  }

  if (state.error) {
    return <p>{JSON.stringify({ name: state.error.name, message: state.error.message })}</p>
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Training Sets</h3>
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <Route exact path={path}>
              <Typography>
                {state.trainingSets.map(renderTrainingSet)}
              </Typography>
            </Route>
            <Route path={`${path}/:trainingSetId`}>
              <TrainingSetImages />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </div>
  )
}

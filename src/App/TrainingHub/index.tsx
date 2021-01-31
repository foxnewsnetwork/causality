import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  Route,
  Switch,
  Link,
  useRouteMatch
} from "react-router-dom";
import TrainingSetImages from 'App/TrainingSetImages';
import TrainingSetCreate from 'App/TrainingSetCreate';
import TrainingSetList from 'App/TrainingSetList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#00000033',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TrainingHub() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <h3>Training Sets</h3>
        </Grid>
        <Grid item xs={3}>
          <Fab color="primary" aria-label="add">
            {/* @ts-ignore */}
            <Link to={`${url}/new`}>
              <AddIcon />
            </Link>
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <Route exact path={path}>
              <TrainingSetList />
            </Route>
            <Route exact path={`${path}/new`}>
              <TrainingSetCreate />
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

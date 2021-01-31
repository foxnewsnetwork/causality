import React, { useCallback } from 'react';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import useAPI from './api';

export default function TrainingSetList() {
  const {
    state,
  } = useAPI();
  const { url } = useRouteMatch();

  const renderTrainingSet = useCallback((trainingSet) => {
    return (
      <ListItem key={`${url}/${trainingSet.id}`} >
        {/** @ts-ignore */}
        <Link to={`${url}/${trainingSet.id}`}>
          <ListItemText primary={trainingSet.name} secondary={`id#${trainingSet.id}`} />
        </Link>
      </ListItem>
    )
  }, [url])

  if (state.loading) {
    return <p>Now Loading...</p>
  }

  if (state.error) {
    return <p>{JSON.stringify({ name: state.error.name, message: state.error.message })}</p>
  }

  return (
    <List>
      {state.trainingSets.map(renderTrainingSet)}
    </List>
  )
}

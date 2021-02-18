import React, { useCallback } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import CircleIcon from '@material-ui/icons/AddCircle'
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import useAPI from './api';

export default function TrainingSetList() {
  const {
    state,
    actions,
    error,
  } = useAPI();
  const { url } = useRouteMatch();

  const renderTrainingSet = useCallback((trainingSet) => {
    const isSelected = state.activeTrainingSet?.id == trainingSet.id
    return (
      <ListItem key={`${url}/${trainingSet.id}`} divider selected={isSelected}>
        <ListItemAvatar>
          <Avatar>
            {isSelected ?
              <StarIcon /> :
              <StarHalfIcon />
            }
          </Avatar>
        </ListItemAvatar>
        {/** @ts-ignore */}
        <Link to={`${url}/${trainingSet.id}`}>
          <ListItemText primary={trainingSet.name} secondary={`id#${trainingSet.id}`} />
        </Link>
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => actions.activateTrainingSet(trainingSet.id)}
          >
            <CircleIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }, [url, state.activeTrainingSet?.id])

  if (error) {
    return <p>{JSON.stringify({ name: error.name, message: error.message })}</p>
  }

  return (
    <List>
      {state.trainingSets.map(renderTrainingSet)}
    </List>
  )
}

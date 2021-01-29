import React, { useCallback } from 'react';
import useTrainingSetImagesAPI from './api';
import type { TrainingSetImagesAPI } from './api';
import { List, ListItem, ListItemText } from '@material-ui/core';

const NOOP = () => { }

type Image = TrainingSetImagesAPI['state']['images'][0];

export default function TrainingSetImages() {
  const {
    state,
  } = useTrainingSetImagesAPI();

  const renderImageListItem = useCallback((image: Image) => {
    return (
      <ListItem key={`${image.id}::${image.path}`} button onClick={NOOP}>
        <ListItemText
          primary={image.path}
          secondary={image.label}
        />
      </ListItem>
    )
  }, [])

  if (state.loading) {
    return <p>Now Loading...</p>
  }

  if (state.error) {
    return <p>
      {JSON.stringify(state.error)}
    </p>
  }

  return (
    <List dense>
      {state.images.map(renderImageListItem)}
    </List>
  )
}

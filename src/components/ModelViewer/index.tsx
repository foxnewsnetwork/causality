import React, { useCallback } from 'react';
import tfvis from '@tensorflow/tfjs-vis';
import type { Sequential } from '@tensorflow/tfjs';
import { Button } from '@material-ui/core';

type Props = {
  model?: Sequential
}
const ModelViewer = (props: Props) => {

  const showModel = useCallback(() => {
    if (props.model != null) {
      tfvis.show.modelSummary({ name: "modelSummary" }, props.model)
    }
  }, [props.model])

  return (
    <Button variant="text" color="secondary" disabled={props.model == null} onClick={showModel}>
      Show Model
    </Button>
  )
}

export default ModelViewer;

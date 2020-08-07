import React, { useCallback } from 'react';
import tfvis from '@tensorflow/tfjs-vis';
import type { Sequential } from '@tensorflow/tfjs';
import { Button } from '@material-ui/core';

type Props = {
  model?: Sequential
}
/**
 * based upon docs found
 * 
 * - https://codelabs.developers.google.com/codelabs/tfjs-training-regression/index.html#3
 * - https://js.tensorflow.org/api/latest/#sequential
 * - https://material-ui.com/components/slider/
 * - https://github.com/tensorflow/tfjs/tree/45788d7c5db2322b9a52daf7be751828a770acfe/tfjs-vis
 * @param props 
 */
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

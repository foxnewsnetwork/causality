import React, { useMemo, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Button } from '@material-ui/core';

type Props = {
  model?: tf.Sequential,
  updateModel: (m: tf.Sequential) => void
}

const ModelBuilder = (props: Props) => {
  const model = useMemo(() => {
    if (props.model != null) {
      return props.model;
    }
    return tf.sequential();
  }, [props.model])

  const addLayer = useCallback(() => {
    const layer = tf.layers.dense({ units: 1, inputShape: [1], useBias: true });
    model.add(layer);
    props.updateModel(model);
  }, [model])

  const resetModel = useCallback(() => {
    props.updateModel(tf.sequential());
  }, [])

  return (
    <div className="model-builder__button-group">
      <Button variant="outlined" color="primary" onClick={addLayer}>
        Add Layer
      </Button>
      <Button variant="outlined" color="secondary" onClick={resetModel}>
        Reset Model
      </Button>
    </div>
  )
}

export default ModelBuilder;

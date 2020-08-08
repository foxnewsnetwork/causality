import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import ModelViewer from 'components/ModelViewer';
import ModelBuilder from 'components/ModelBuilder';
import { Sequential } from '@tensorflow/tfjs';

const TensorFlowSandbox = () => {
  const [tfModel, setTFModel] = useState<Sequential>();

  return (
    <Container>
      <ModelViewer model={tfModel} />
      <ModelBuilder model={tfModel} updateModel={setTFModel} />
    </Container>
  )
}

export default TensorFlowSandbox;

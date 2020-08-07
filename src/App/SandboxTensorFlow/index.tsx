import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import ModelViewer from 'components/ModelViewer';
import ModelBuilder from 'components/ModelBuilder';

const TensorFlowSandbox = () => {
  const [tfModel, setTFModel] = useState();

  return (
    <Container>
      <ModelViewer model={tfModel} />
      <ModelBuilder model={tfModel} updateModel={setTFModel} />
    </Container>
  )
}

export default TensorFlowSandbox;

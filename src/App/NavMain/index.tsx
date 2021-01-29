import React from 'react';
import { Routes } from 'App/routes';
import {
  Switch,
  Route
} from "react-router-dom";
import SandboxVideo from 'App/SandboxVideo';
import SandboxTensorFlow from 'App/SandboxTensorFlow';
import ModelHub from 'App/ModelHub';
import "./style.css";
import SandboxApollo from 'App/SandboxApollo';
import TrainingHub from 'App/TrainingHub';

const NavMain = () => {
  return (
    <main className="nav-main">
      <Switch>
        <Route path={Routes.TRAINING_HUB}>
          <h2>Training Hub</h2>
          <TrainingHub />
        </Route>
        <Route path={Routes.SANDBOX_TENSORFLOW}>
          <h2>Tensor Flow</h2>
          <SandboxTensorFlow />
        </Route>
        <Route path={Routes.SANDBOX_VIDEO}>
          <h2>Video</h2>
          <SandboxVideo />
        </Route>
        <Route path={Routes.MODEL_HUB}>
          <h2>Model</h2>
          <ModelHub />
        </Route>
        <Route path={Routes.SANDBOX_APOLLO}>
          <h2>Apollo</h2>
          <SandboxApollo />
        </Route>
        {/** Default home route _must_ come last as the "/" matches everything */}
        <Route path={Routes.HOME}>
          <h2>Home:path</h2>
        </Route>
      </Switch>
    </main>
  )
}

export default NavMain;

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

const NavMain = () => {
  return (
    <main className="nav-main">
      <Switch>
        <Route name={Routes.SANDBOX_TENSORFLOW}>
          <SandboxTensorFlow />
        </Route>
        <Route name={Routes.SANDBOX_VIDEO}>
          <SandboxVideo />
        </Route>
        <Route name={Routes.MODEL_HUB}>
          <ModelHub />
        </Route>
      </Switch>
    </main>
  )
}

export default NavMain;

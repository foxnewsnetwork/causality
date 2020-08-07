import React from 'react';
import { Routes } from 'App/routes';
import {
  Switch,
  Route
} from "react-router-dom";
import SandboxVideo from 'App/SandboxVideo';
import SandboxTensorFlow from 'App/SandboxTensorFlow';
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
      </Switch>
    </main>
  )
}

export default NavMain;

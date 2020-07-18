import React from 'react';
import { Routes } from 'App/routes';
import {
  Switch,
  Route
} from "react-router-dom";
import Home from 'App/Home';

const NavMain = () => {
  return (
    <Switch>
      <Route name={Routes.HOME}>
        <Home />
      </Route>
    </Switch>
  )
}

export default NavMain;

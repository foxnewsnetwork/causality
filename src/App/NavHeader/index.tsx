import React from 'react';
import { RouteMap, Routes } from 'App/routes';
import { map } from 'lib/utils/iter';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const RouteLink = ([path, name]: [Routes, string]) => {
  return (
    <Link to={path} key={name}>
      <Button>
        {name}
      </Button>
    </Link>
  )
}

const Header = () => {
  return (
    <AppBar position="absolute">
      <Toolbar>
        {[...map(RouteMap, RouteLink)]}
      </Toolbar>
    </AppBar>
  )
}

export default Header;

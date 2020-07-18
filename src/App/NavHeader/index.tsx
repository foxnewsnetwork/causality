import React from 'react';
import logo from './logo.svg';
import { RouteMap, Routes } from 'App/routes';
import { map } from 'utils/iter';
import { Link } from 'react-router-dom';

const RouteLink = ([path, name]: [Routes, string]) => {
  return (
    <li>
      <Link to={path}>{name}</Link>
    </li>
  )
}

const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <nav>
        <ul>
          {map(RouteMap, RouteLink)}
        </ul>
      </nav>
    </header>
  )
}

export default Header;

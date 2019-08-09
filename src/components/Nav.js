import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Nav = () => (
  <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item">
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li className="nav__item">
        <NavLink to="/posts">Tabs</NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;

import React from 'react';
import { NavLink } from 'react-router-dom';
import m from './navbar.module.css';

const NavBar = () => {
  return (
    <div className={m.Navbar}>
      <div className={m.navbarBody}>
        <NavLink activeClassName={m.active} to="/profile">Profile</NavLink>
        <NavLink activeClassName={m.active} to="/users">Users</NavLink>
      </div>
    </div>
  )
}

export default NavBar;
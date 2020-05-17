import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="Header">
      <div className="HeaderBody">
        <h1>social network</h1>
        {props.isAuth
          ? <div className='HeaderRight'>
              <NavLink className='HeaderUserBlock' to='/profile'>{props.login}</NavLink>
              <a className='login' onClick={() => props.logout()} href='#'>Logout</a>
            </div>
          : <NavLink className='login' to='/login'>Login</NavLink>
        }
      </div>
    </div>
  )
};

export default Header;

import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-primary position-fixed w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          WikiCountries
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

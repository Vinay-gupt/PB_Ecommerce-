// src/components/Navbar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Buttons from './Buttons';
// import './Navbar.css';
const Navbar = () => {
    const cartItems = useSelector((state) => state.Product);
      const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <Link to="/home" style={{textDecoration:"none",color:"white"}}><div className="navbar-logo">Prismberry</div></Link>
      <div className="navbar-buttons">
        <Buttons/>
        <Link to="/cart" onClick={() => {
                        window.scroll({
                            top: 0,
                             behavior:"instant"
                        });
                    }}><button className='navbar-button' style={{marginRight:"5px"}} >Cart ({cartItems.length})</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;

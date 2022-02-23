import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const state = useSelector((state)=> state.handleCart)
    return (
        <div>
          <nav className ="navbar navbar-light bg-light py-3 bg-white shadow-sm">
            <div className ="container">
                <NavLink className="navbar-brand fw-bold fs-4" to="/">Ecommerce</NavLink>
            <div className="button"> 
                <NavLink className="btn btn-outline-dark ms-2"  to="/cart">
                <i className="fa fa-shopping-cart me-1"></i>Cart ({state.length})</NavLink>
            </div>
            </div>
          </nav>
        </div> 
    )       
}

export default Navbar;
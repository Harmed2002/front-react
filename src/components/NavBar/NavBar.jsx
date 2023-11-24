import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../../components/AuthUser/AuthUser';
import './NavBar.css';

const NavBar = () => {
	const {token, logout} = AuthUser();

    const logoutUser = () => {
        if(token != undefined){
            logout();
        }
    }

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Register</Link>
				</li>
				<li className="nav-item">
					<span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
				</li>

			</ul>

		</nav>
	);
};

export default NavBar

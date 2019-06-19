import React from 'react';
import {    
    NavLink
} from 'react-router-dom'

function NavMenu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink exact={true} className="navbar-brand" to="/" activeClassName="active">Primal Movies</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavMenu;
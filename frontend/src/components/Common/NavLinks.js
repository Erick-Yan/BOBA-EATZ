import React from "react";
import {NavLink} from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to='/all-drinks'>ALL DRINKS</NavLink>
        </li>
        <li>
            <NavLink to='/all-shops'>ALL SHOPS</NavLink>
        </li>
    </ul>
}

export default NavLinks;
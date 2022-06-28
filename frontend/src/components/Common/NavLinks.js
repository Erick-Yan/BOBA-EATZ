import React from "react";
import {NavLink} from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to='/search-results' exact>SEARCH</NavLink>
        </li>
        <li>
            <NavLink to='/recommender'>RECOMMENDER</NavLink>
        </li>
        <li>
            <NavLink to='/bucketlist'>MY BUCKETLIST</NavLink>
        </li>
        <li>
            <NavLink to='/authenticate'>AUTHENTICATE</NavLink>
        </li>
    </ul>
}

export default NavLinks;
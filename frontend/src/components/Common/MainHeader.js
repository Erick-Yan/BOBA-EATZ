import React, {useState} from 'react';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import {Link} from 'react-router-dom';

import './MainHeader.css';


const MainHeader = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <div className="mainHeader">
                <button className='navButton' onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='title'><Link to="/">MY BOBA.</Link></h1>
            </div>
        </React.Fragment>
    )
}

export default MainHeader;
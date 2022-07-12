import React, {useEffect, useState} from 'react';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';
import { Link, useHistory } from 'react-router-dom';
import { TextField, styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './MainHeader.css';

const SearchTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
    },
  }));


const MainHeader = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [searchOption, setSearchOption] = useState("DRINKS");
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const handleClick = (event) => {
      setAnchor(event.currentTarget);
    }
    const handleClose = () => {
      setAnchor(null);
    }
    const history = useHistory();

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log(searchOption.toLowerCase());
          history.push(`/search-results/${searchOption.toLowerCase()}:${event.target.value}`);
          history.go();
        }
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
                <SearchTextField
                    label={`SEARCH ${searchOption}`}
                    id="search-input"
                    variant="filled"
                    sx={{
                        marginLeft: 'auto',
                        marginRight: 7,
                        width: 300
                    }}
                    onClick={handleClick}
                    onKeyPress={(e) => {handleKeyDown(e)}}
                />
                <Menu
                  id="basic-menu"
                  anchorEl={anchor}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': "basic-button",
                  }}
                >
                  <MenuItem onClick={() => {handleClose(); setSearchOption("DRINKS");}}>Drink</MenuItem>
                  <MenuItem onClick={() => {handleClose(); setSearchOption("SHOPS");}}>Shop</MenuItem>
                </Menu>
            </div>
        </React.Fragment>
    )
}

export default MainHeader;
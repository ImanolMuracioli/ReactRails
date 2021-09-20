import React from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import BlockIcon from '@material-ui/icons/Block';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { useEffect, useState } from "react";
import GlobalVariable from './GlobalVariable'
 

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
      textTransform: 'uppercase',
      fontSize: '12px',
      paddingLeft: '10px'
  },
  signin: {
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
  },
  linkbutton:{
    textDecoration: 'none',
    color: 'white',
    fontSize: '5' 
  },
  buttonfont:{
    fontSize: '5'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));






export default function PrimarySearchAppBar(props) {
  
 
  const history = useHistory();
  const [visibility_control, setVisibilityControl] = useState(false);

  useEffect(() => {
    visibility_button()
  })

  const visibility_button = () => {
    let jwt=window.localStorage.getItem('jwt')
    let visibility_log = false


    try {
      let result = jwtDecode(jwt)
      visibility_log = true
    } catch (error) {
    }
    if (visibility_log === true) {
      console.log("Verdadero")
      console.log(visibility_log)

      setVisibilityControl('hidden'); // (B)
    }
    else{
      console.log("Falso")
      console.log(visibility_log)
      setVisibilityControl('visible'); // (B)
    }
    
  };

 

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const handleLogout = () =>{
    console.log("Logout")
    console.log(localStorage)
    localStorage.removeItem('jwt')
    history.push("/signin")
    visibility_button()

    
  }


 
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  
 let remaining = 0


  return (
    
   
    
    <div className={classes.grow}>
     {console.log("Se renderiza Appbar")}
    
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link className = {classes.linkbutton} to="/products">
            <Button color="inherit" className = {classes.buttonfont} >Productos</Button>
          </Link>
          <Link className = {classes.linkbutton} to="/prueba">
            <Button color="inherit" className = {classes.buttonfont} >Prueba</Button>
          </Link>

                 
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

          {console.log('Visibility')}
          {console.log(visibility_control)}
          <Link className = {classes.linkbutton} to="/Signup"  style={{visibility: visibility_control}} >
              <Button color="inherit" className = {classes.buttonfont} >Signup</Button>
          </Link>

            <Link className = {classes.linkbutton} to="/Signin" style={{visibility: visibility_control}}>
              <Button color="inherit" className = {classes.buttonfont} >Signin</Button>
            </Link>

            {console.log(props)}
            {console.log(props.login)}
            <Link className = {classes.linkbutton} to="/Signin" style={{visibility: visibility_control}}>
              <Button color="inherit" className = {classes.buttonfont} >Signin</Button>
            </Link>
     
            <IconButton aria-label="delete" onClick={()=>handleLogout()}>
                <BlockIcon />
            </IconButton>
         

         
          


            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge color="secondary">
                <PersonIcon />
              </Badge>
            </IconButton>

            {/*
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            */}

            

          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
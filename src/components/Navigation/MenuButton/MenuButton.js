import React from 'react'
import classes from './MenuButton.css'

const menuButton = (props) => (
    <div onClick={props.toggleMenu} className={classes.DrawerToggle}>
        <div/>
        <div/>
        <div/>
    </div>
);

export default menuButton;
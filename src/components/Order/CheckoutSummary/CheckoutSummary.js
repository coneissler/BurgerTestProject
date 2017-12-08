import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger orderedIngs={props.orderedIngs}/>
            </div>
            <Button btnType="Danger" hideButton={props.visibility} clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" hideButton={props.visibility} clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
};


export default checkoutSummary;
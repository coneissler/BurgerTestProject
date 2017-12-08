import React from 'react';
import classes from './Order.css'
import Burger from '../Burger/Burger'
import OrderBox from '../UI/OrderBox/OrderBox'

const order = (props) => {

    const backColor = props.color;

    return(
       <div className={classes.Order} style={{backgroundColor: backColor}} >
           <Burger orderedIngs={props.orderedIngs} order/>
           <OrderBox
               ingredients={props.ingredients}
               price={props.price}
               customer={props.customer}
               burgerName={props.burgerName}
               color={props.color}
               comment={props.comment}
               style={{display: 'inline-block'}}
           />
        </div>
   );
};

export default order;
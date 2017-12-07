import React from 'react';
import classes from './OrderBox.css'

const orderBox = (props) => {

    const ingredients = [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }



    let comment = null;
    if (props.comment){
        comment = <p style={{fontSize: '1.5vw'}}><i>'{props.comment}'</i></p>
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    fontSize: '2vw',
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '10px 8px 0px 0px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    backgroundColor: 'white'
                }}
            >{ig.name} ({ig.amount})</span>)
    });
    return(
        <div className={classes.OrderBox}>
            <p style={{fontSize: '3vw', marginBottom: '0px'}}><strong>The {props.burgerName}</strong></p>
            <p style={{fontSize: '1.5vw'}}><i> by: {props.customer}</i></p>
            {ingredientOutput}
            <p style={{fontSize: '2vw'}}>Price <strong>{Number.parseFloat(props.price).toFixed(2)}$</strong></p>
            {comment}
            </div>
    );
};

export default orderBox;
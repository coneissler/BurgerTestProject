import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = [];

    if(props.orderedIngs){
    transformedIngredients = props.orderedIngs.map((ing, i) => {
        return <BurgerIngredient key={i} type={ing}/>
    });
    }

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    let appliedClass = classes.Burger;
    if(props.order){
        appliedClass = classes.BurgerOrder;
    }
    return (
        <div className={appliedClass}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;

//
// let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
// return [...Array(props.ingredients[igKey])].map((_, i) => {
//     return <BurgerIngredient key={igKey + i} type={igKey} />
// });
// })
// .reduce((arr, el) => {
//     return arr.concat(el)
// }, []);
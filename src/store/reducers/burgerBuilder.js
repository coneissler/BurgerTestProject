import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utiltity';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    orderedIngs: [],
    error: false,
    buttonVisibility: 'HideMeNot'
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const ING_DICTIONARY = {
    salad: 's',
    cheese: 'c',
    meat: 'm',
    bacon: 'b'
};


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);

        default:
            return state;
    }
};


const addIngredient = (state, action) => {
    let updatedContents = [];
    if(state.orderedIngs.length > 0) updatedContents = state.orderedIngs.slice();
    updatedContents.push(ING_DICTIONARY[action.ingredientName]);
    const newIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1});

    return updateObject(state, {
        ingredients: newIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        orderedIngs: updatedContents
    });
};

const removeIngredient = (state, action) => {
    let updatedContents = [];
    updatedContents = state.orderedIngs.slice();
    let i;
    for(i = updatedContents.length; i >= 0; i--) {
        if (updatedContents[i] === ING_DICTIONARY[action.ingredientName]){
            updatedContents.splice(i, 1);
            break;
        }}

    const newIngs = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] - 1});

    return updateObject(state, {
        ingredients: newIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        orderedIngs: updatedContents
    });
};

const setIngredient = (state, action) => {
    let updatedContents = [];
    updatedContents = [];
    if(action.ingredients.ordered) updatedContents = action.ingredients.ordered;

    return updateObject(state, {
        ingredients: action.ingredients.raw,
        orderedIngs: updatedContents,
        totalPrice: 4,
        error: false
    });
};

const fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true});
};

export default reducer;
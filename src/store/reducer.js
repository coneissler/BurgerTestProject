import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    orderedIngs: [],
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
    let updatedContents = null;
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            updatedContents = state.orderedIngs.slice();
            updatedContents.push(ING_DICTIONARY[action.ingredientName]);
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                orderedIngs: updatedContents


            };

        case actionTypes.REMOVE_INGREDIENT:
            updatedContents = state.orderedIngs.slice();
            let i;
            for(i = updatedContents.length; i >= 0; i--) {
                if (updatedContents[i] === ING_DICTIONARY[action.ingredientName]){
                    updatedContents.splice(i, 1);
                    break;
                }}

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                orderedIngs: updatedContents
            };
        default:
            return state;
    }
};

export default reducer;
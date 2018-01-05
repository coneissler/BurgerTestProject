import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm: {
            customerName:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '*Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            burgerName:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '*Name your burger'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {},
                valid: true
            },
            comment:{
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Add a Comment'
                },
                value: '',
                validation: {},
                valid: true
            },
            color:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'lightsalmon', displayValue: 'Red'},
                        {value: 'lightblue', displayValue: 'Blue'},
                        {value: 'lightgreen', displayValue: 'Green'},
                        {value: 'lightgoldenrodyellow', displayValue: 'Yellow'},
                        {value: 'lightseagreen', displayValue: 'Teal'},
                        {value: 'lightpink', displayValue: 'Pink'},
                    ]
                },
                value: 'lightsalmon',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData= {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            orderedIngs: this.props.orderedIngs,
            price: this.props.price,
            orderData: formData
        };

        this.props.onOrderBurger(order);

    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid})
    };

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
    }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementtype={formElement.config.elementType}
                        elementconfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        orderedIngs: state.burgerBuilder.orderedIngs,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
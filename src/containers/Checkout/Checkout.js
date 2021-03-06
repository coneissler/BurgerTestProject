import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {
    state = {
        hide: 'HideMeNot'
    };


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        this.setState({
            hide: 'HideMe'
        })
    };


    render(){
        let summary = <Redirect to="/"/>;
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        orderedIngs={this.props.orderedIngs}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        visibility={this.state.hide}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>)
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        orderedIngs: state.burgerBuilder.orderedIngs,
        purchased: state.order.purchased
    }
};



export default connect(mapStateToProps)(Checkout);
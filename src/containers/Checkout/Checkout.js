import React,{Component} from 'react';
import {Route} from 'react-router-dom'
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
        return(
            <div>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        orderedIngs: state.orderedIngs
    }
};



export default connect(mapStateToProps)(Checkout);
import React,{Component} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders});

            })
            .catch(err => {
                this.setState({ loading: false});
            })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        orderedIngs={order.orderedIngs}
                        price={order.price}
                        color={order.orderData.color}
                        burgerName={order.orderData.burgerName}
                        customer={order.orderData.customerName}
                        comment={order.orderData.comment}

                        // by={order.customer.name}
                        // country={order.customer.address.country}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
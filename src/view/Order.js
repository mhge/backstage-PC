import React, { Component } from "react"
import { Route, Redirect, HashRouter as Router, } from "react-router-dom"
import Orderlist from "./Orderlist"
import Sechorder from "./Sechorder"
import Alter from "./Alter"




class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
           

        }
     
    }
   
    render() {
        return (
            <div>
                <Router>
           
                {/* <Redirect to="/home/order/orderlist" /> */}

              <Route path="/home/order/orderlist" component={Orderlist} />
              <Route path="/home/order/sechorder" component={Sechorder} />
              <Route path="/home/order/alter" component={Alter}/>



       
                </Router>
            </div>
        )
    }

   
}



export default Order
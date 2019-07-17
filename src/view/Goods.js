import React, { Component } from "react"
import {Route, Redirect, HashRouter as Router, } from "react-router-dom"
import Goodslist from "./Goodslist"
import Addgoods from "./Addgoods"
import Sechgoods from "./Sechgoods"
import Revise from "./Revise"




class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
           

        }
     
    }
   
    render() {
        return (
            <div>
                <Router>
           
                {/* <Redirect to="/home/goods/goodslist" /> */}
              <Route path="/home/goods/goodslist" component={Goodslist} />
              <Route path="/home/goods/addgoods" component={Addgoods} />
              <Route path="/home/goods/sechgoods" component={Sechgoods} />
              <Route path="/home/goods/revise" component={Revise}/>



       
                </Router>
            </div>
        )
    }

   
}



export default Goods
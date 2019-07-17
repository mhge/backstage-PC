import React, { Component } from "react"
import { Route, Redirect, HashRouter as Router, } from "react-router-dom"
import Classlist from "./Classlist"
import Addclass from "./Addclass"
import Sechclass from "./Sechclass"
import Amend from "./Amend"




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

                    {/* <Redirect  to="/home/class/classlist" /> */}

                    <Route path="/home/class/classlist" component={Classlist} />
                    <Route path="/home/class/addclass" component={Addclass} />
                    <Route path="/home/class/sechclass" component={Sechclass} />
                    <Route path="/home/class/amend" component={Amend} />



                </Router>
            </div>
        )
    }


}



export default Goods
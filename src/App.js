import React,{Component} from 'react';
// import logo from './logo.svg';
import Login from "./view/Login"
import Home from "./view/Home"
import {Route,Redirect, HashRouter as Router,exact} from "react-router-dom"
import './App.css';
import app from "./css/App.module.css"
class App extends Component{

  render(){
    return(
      <div className={app.tit}>
          <Router>
            <div>
              {/* <Redirect to="/home#/home/admin" /> */}
              
              <Route path="/" component={Login} exact/>
              <Route path="/login" component={Login}/>
              <Route path="/home" component={Home}/>
              
              
            </div>
          </Router>
      </div>
    )
  }
}


export default App;

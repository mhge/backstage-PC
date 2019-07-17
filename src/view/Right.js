import React, { Component } from "react"
import {  Result, Button, } from 'antd';

class Right extends Component {
    constructor(props) {
        super(props)
        this.state={
        

        }
    }
    tap = e => {
      this.props.history.push('/home/userlist')
    };
    render(){
      return (
        <div>
          <Result
            title="操作失败"
            extra={
              <Button type="primary" key="console" onClick={this.tap} >
                点击返回用户列表
              </Button>
            }
          />,
        </div>
      )
    }
    componentDidMount(){
    
    }
}


export default Right
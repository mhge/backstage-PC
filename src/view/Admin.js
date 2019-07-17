import React, { Component } from "react"
import { Descriptions, Badge } from 'antd';
import axios from "axios"
import Action from "../redux/Action"
import Store from "../redux/Store"

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state={
          list:'',

        }
    }
   
    render(){
      return (
        <div>
            <Descriptions title="管理员信息" layout="vertical" bordered>
                <Descriptions.Item label="昵称">{this.state.list.nickName}</Descriptions.Item>
                <Descriptions.Item label="用户密码">{this.state.list.password}</Descriptions.Item>
                <Descriptions.Item label="用户名">{this.state.list.userName}</Descriptions.Item>
                <Descriptions.Item label="创建日期">{this.state.list.createdAt}</Descriptions.Item>
                <Descriptions.Item label="更新日期">{this.state.list.updatedAt}</Descriptions.Item>
            </Descriptions>
        </div>
      )
    }
    componentDidMount(){
      var token=localStorage.getItem("admintoken")
      var that=this      
      axios({
        method:'get',
        url:'http://api.cat-shop.penkuoer.com/api/v1/users/manager_info',
        headers:{'Accept':'application/json','Authorization':'Bearer '+ token},
    }).then(function(res){
    Store.dispatch(Action.userid(res.data._id))
      that.setState({list:res.data})   
    }).catch(function(err){
      that.props.history.push("/")
    })
    }
}


export default Admin
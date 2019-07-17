import React, { Component } from "react"
import axios from 'axios';

import { Result,Button,Input,Row, Col , } from 'antd';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;



class Addlist extends Component {
    constructor(props) {
        super(props)
        this.state={
          ipt1:'',
          ipt2:'',
          ipt3:'',
          ipt4:'',
          list:'',
          display:"none",
          displays:"block"

        }
    }
  componentDidMount() {

  }
    showDrawer = (e) => {
       var token= localStorage.getItem("admintoken")
       console.log(token)
        var that=this  
        axios({
        url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users',
        method: 'post',
        data:{userName:this.state.ipt1,nickName:this.state.ipt2,avatar:this.state.ipt3,password:this.state.ipt4 },
        headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
    }).then(function(res){
          console.log(res)
          that.setState({display:"block",displays:"none"})
    }).catch(function(err){
      that.props.history.push("/home/admin")
    })
    };
    onChange = e => {
      this.setState({ipt1:e.target.value})
    };
    onChanges = e => {
      this.setState({ipt2:e.target.value})
    };
    onChangess = e => {
      this.setState({ipt3:e.target.value})
    };
    onChangesss = e => {
      this.setState({ipt4:e.target.value})
    };
    componentWillMount() {
     
      }
      res = e => {
        this.props.history.push('/home/userlist')
      };
    render(){          
      return (       
        <div>
          <div style={{display:this.state.display}}>
            <Result
            status="success"
            title="信息添加完成"
            subTitle="信息已经添加完成，请点击返回用户列表页面查看"
            extra={[
              <Button type="primary" key="console" onClick={this.res}>
                点击返回
              </Button>,
                ]}
              />
              </div>
              <div style={{display:this.state.displays}}>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={6}>
                <div>
                <Row type="flex" justify="space-around" align="middle" style={{height:"50px",textAlign:"center",color:"#19CAAD"}}>
                  <Col span={24}>
                    <DemoBox value={120}>
                          请输入相应信息
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Input placeholder="用户名" allowClear onChange={this.onChange} />
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Input placeholder="用户昵称" allowClear onChange={this.onChanges} />
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Input placeholder="用户密码" allowClear onChange={this.onChangesss} />
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Input placeholder="请输入网络图片地址" allowClear onChange={this.onChangess} />
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" style={{textAlign:"center"}}>
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Button type="primary" onClick={this.showDrawer}>
                      点击增加
                    </Button>
                    </DemoBox>
                  </Col>
                </Row>
                </div>
              </Col>
            </Row>
            </div>
        </div>
      )
    }
   
}


export default Addlist
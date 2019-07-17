import React, { Component } from "react"
import axios from 'axios';
import Store from "../redux/Store"

import {Modal, Result, Descriptions, Button, Input, Row, Col, } from 'antd';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;



class Modify extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ipt1: '',
      ipt2: '',
      ipt3: '',
      ipt4:'',
      list: '',
      token: '',
      id: Store.getState().username,
      display: "none",
      display2: "block",
      display4: "none",
      display5: "none",
      visible: false,
      userid:Store.getState().userid,
      address:'',


    }
    this.chanegeitem = this.chanegeitem.bind(this)
  }
  showModal = () => {
    this.setState({display4: "none", display5: "none", })

    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    var that = this
    axios({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + this.state.id,
      method: 'put',
      params: { userName: this.state.ipt1, nickName: this.state.ipt2, avatar: this.state.ipt3 },
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
    }).then(function (res) {
      console.log(res.data)
      that.setState({ display: "block", display2: "none" })
    }).catch(function (err) {
      that.props.history.push("/home/userlist")
    })
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  chanegeitem() {
    this.setState({
      token: Store.getState().token,
      id: Store.getState().username,
      userid: Store.getState().userid,


    })
  }
  componentDidMount() {
    Store.subscribe(this.chanegeitem)
    console.log(this.state.userid)
    var that = this
    axios({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + this.state.id,
      method: 'get',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
    }).then(function (res) {
      if(res.data.userName){
        that.setState({ list: res.data})
    }else{
        that.props.history.push("/home/userlist")
    }

    }).catch(function (err) {
      that.props.history.push("/home/userlist")
    })

  }
  showDrawer2 = (e) => {
    var that = this
    axios({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users/reset_pwd/' + this.state.id,
      method: 'put',
      data: { password: this.state.ipt4},
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
    }).then(function (res) {
      console.log(res.data)
      var thats = that
      axios({
        url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + that.state.id,
        method: 'get',
        headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + that.state.token },
      }).then(function (res) {
        console.log(res.data)
        thats.setState({ list: res.data })
      }).catch(function (err) {
        thats.props.history.push("/home/userlist")
      })
      that.setState({ display: "block", display2: "none" })
    }).catch(function (err) {
      that.props.history.push("/home/userlist")
    })
    this.setState({
      visible: false,
    });

  }
 
  showDrawer4 = (e) => {
    this.setState({display4: "block", display5: "none", })

  }
  showDrawer5 = (e) => {
    this.setState({display4: "none", display5: "block", })
    var that = this
    axios({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/addresses/' + this.state.userid,
      method: 'get',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
    }).then(function (res) {
      that.setState({address:res.data.addresses[0].address})
    }).catch(function (err) {
      that.props.history.push("/home/userlist")
    })
    this.setState({
      visible: false,
    });
  }
  onChange = e => {
    this.setState({ ipt1: e.target.value })
  };
  onChange2 = e => {
    this.setState({ ipt2: e.target.value })
  };
  onChange3 = e => {
    this.setState({ ipt3: e.target.value })
  };
  onChange4 = e => {
    this.setState({ ipt4: e.target.value })
  };
  componentWillMount() {
    var token = localStorage.getItem("admintoken")
    this.setState({token:token})
  }
  res = e => {
    this.setState({ display: "none", display2: "block" })
  };
  tap = e => {
    this.props.history.push('/home/userlist')
  };
  render() {
    return (
      <div>
        <div style={{ display: this.state.display }}>
          <Result
            status="success"
            title="页面修改完成"
            subTitle="信息已经修改完成，请点击返回用户列表页面查看"
            extra={[
              <Button type="primary" key="console" onClick={this.res}>
                点击返回修改页面
              </Button>,
              <Button key="buy" onClick={this.tap}>
                点击返回用户列表
              </Button>,
            ]}
          />
        </div>
        <div style={{ display: this.state.display2 }}>
          <Descriptions title="修改信息" layout="vertical" bordered>
            <Descriptions.Item label="id">{this.state.list._id}</Descriptions.Item>
            <Descriptions.Item label="用户密码">{this.state.list.password}</Descriptions.Item>
            <Descriptions.Item label="用户名">{this.state.list.userName}</Descriptions.Item>
            <Descriptions.Item label="创建日期">{this.state.list.createdAt}</Descriptions.Item>
            <Descriptions.Item label="更新日期">{this.state.list.updatedAt}</Descriptions.Item>
          </Descriptions>
          <Row type="flex" justify="space-around" align="middle" style={{ height: "50px", textAlign: "center", color: "#19CAAD" }}>
            <Col span={24}>
              <DemoBox value={120}>
                <Button type="primary" onClick={this.showModal} style={{ marginRight: 20 }}>
                  修改信息
                    </Button>
                <Button type="primary" onClick={this.showDrawer4} style={{ marginRight: 20 }}>
                  修改密码
                    </Button>
                <Button type="primary" onClick={this.showDrawer5} style={{ marginRight: 20 }}>
                  获取地址
                    </Button>
              </DemoBox>
            </Col>
          </Row>
          <div style={{ display: this.state.display5 }}>
            该用户地址：<p>{this.state.address}</p>
          </div>
          <div style={{ display: this.state.display4 }}>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={24}>
                <DemoBox value={120}>
                  <Input placeholder="用户密码" allowClear onChange={this.onChange4} />
                </DemoBox>
              </Col>
            </Row>
            <Button type="primary" onClick={this.showDrawer2}>
              点击修改
            </Button>
          </div>
          <div>
            <Modal
              title="修改信息栏"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <Row type="flex" justify="space-around" align="middle">
                <Col span={12}>
                  <Row type="flex" justify="space-around" align="middle" style={{ height: "50px", textAlign: "center", color: "#19CAAD" }}>
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
                        <Input placeholder="用户昵称" allowClear onChange={this.onChange2} />
                      </DemoBox>
                    </Col>
                  </Row>
                  <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                      <DemoBox value={120}>
                        <Input placeholder="请输入网络图片地址" allowClear onChange={this.onChange3} />
                      </DemoBox>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal>
          </div>
        </div>
      </div>
    )
  }

}


export default Modify
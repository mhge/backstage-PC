import React, { Component } from "react"
import Store from "../redux/Store"
import userlist from "../css/Userlist.module.css"
import { NavLink, } from "react-router-dom"
import Action from "../redux/Action"

import { Row, Col, Descriptions, Drawer, Button, List, Modal, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'http://api.cat-shop.penkuoer.com/api/v1/admin/users';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;



class Userlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      visible: false,
      pageNum: 1,
      childrenDrawer: false,
      id: '',
      i: '',
      arr: [],
      token: "",
      placement: 'top',
      list: ''
    }

  }
  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      data: { per: 10, page: this.state.pageNum },
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
      success: res => {
        callback(res);

      },
    });
  };
  componentWillMount() {
    this.setState({ token: localStorage.getItem("admintoken") })
  }

  componentDidMount() {
    this.fetchData(res => {
      var pageNum = this.state.pageNum + 1
      this.setState({
        data: res.users,
        pageNum: pageNum,
      });
    });
  }
  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (this.state.pageNum > 8) {
      message.warning('用户列表已经加载完，没有更多数据');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.users);
      var pageNum = this.state.pageNum + 1
      this.setState({
        pageNum: pageNum,
        data,
        loading: false,
      });
    });
  };
  showModal = (id, i) => {
    this.setState({
      visible: true,
      id: id,
      i: i
    });
  };
  handleOk = e => {
    reqwest({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + this.state.id,
      type: 'json',
      method: 'delete',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
      success: res => {
        let { data } = this.state;
        console.log(res)
        var i = this.state.i
        console.log(i)
        this.state.data.splice(i, 1)
        this.fetchData(res => {
          data = data.concat(res.users);
          this.setState({
            pageNum: 1,
            data,
          });
        });
      },
    });
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
  showChildrenDrawer = (id) => {
    console.log(id)
    reqwest({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + id,
      type: 'json',
      method: 'get',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
      success: res => {
        console.log(res)
        this.setState({ list: res })
      },
    });

    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = (e) => {

    Store.dispatch(Action.ids(e))
    this.setState({
      childrenDrawer: false,
    });
  };

  render() {
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle" style={{ height: "50px", textAlign: "center", color: "#19CAAD", fontSize: "24px" }}>
          <Col span={24}>
            <DemoBox value={120}>
              用户列表
              </DemoBox>
          </Col>
        </Row>
        <div className={userlist.demoinfinite}>
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >

            <List
              header={<div>
                <Row type="flex" justify="space-around" align="middle">
                  <Col className="gutter-row" span={8} offset={1}>
                    用户昵称
                  </Col>
                  <Col className="gutter-row" span={11}>
                    用户id
                  </Col>
                  <Col className="gutter-row" span={4}>
                    管理信息
                  </Col>
                </Row>
              </div>}
              dataSource={this.state.data}
              renderItem={(item, i) => (
                <List.Item key={item._id}
                  actions={[
                    <Button style={{
                      background: '#A0EEE1',
                    }} onClick={this.showChildrenDrawer.bind(this, item._id)}>
                      用户详情
                  </Button>,
                    <Button type="danger" data-id={item._id} data-key={i} onClick={this.showModal.bind(this, item._id, i)}>删除</Button>,

                  ]} >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2939583987,3327046165&fm=115&gp=0.jpg" />
                    }
                    title={item.userName}
                    description={item.nickName}

                  />
                  <div>
                    <div style={{
                      marginRight: 230,
                    }}>{item._id}</div>

                    <Modal
                      title="删除用户"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      okText="确认"
                      cancelText="取消"
                    >
                      <p className={userlist.os}>是否确认删除选中的用户信息,请谨慎选择！！！！！！！！</p>
                    </Modal>

                    <Drawer
                      title="用户详情页面"
                      height={380}
                      placement={this.state.placement}
                      closable={false}
                      onClose={this.onChildrenDrawerClose}
                      visible={this.state.childrenDrawer}
                    >
                      <Descriptions layout="vertical" bordered>
                        <Descriptions.Item label="昵称">{this.state.list.nickName}</Descriptions.Item>
                        <Descriptions.Item label="用户密码">{this.state.list.password}</Descriptions.Item>
                        <Descriptions.Item label="用户名">{this.state.list.userName}</Descriptions.Item>
                        <Descriptions.Item label="创建日期">{this.state.list.createdAt}</Descriptions.Item>
                        <Descriptions.Item label="更新日期">{this.state.list.updatedAt}</Descriptions.Item>
                      </Descriptions>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          width: '100%',
                          borderTop: '1px solid #e8e8e8',
                          padding: '10px 16px',
                          textAlign: 'center',
                          left: 0,
                          background: '#fff',
                          borderRadius: '0 0 4px 4px',
                        }}
                      >
                        <Button
                          style={{
                            marginRight: 8,
                          }}
                          onClick={this.onChildrenDrawerClose}
                        >
                          关闭
                      </Button>
                        <Button style={{
                          marginRight: 8,
                        }} onClick={this.onChildrenDrawerClose.bind(this, this.state.list._id)} type="primary">
                          <NavLink to="/home/modify">修改用户</NavLink>
                        </Button>
                      </div>
                    </Drawer>

                  </div>

                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className={userlist.demoloading}>
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}


export default Userlist
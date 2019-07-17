import React, { Component } from "react"
import Store from "../redux/Store"
import userlist from "../css/Userlist.module.css"
import { NavLink, } from "react-router-dom"
import Action from "../redux/Action"

import { Input, Row, Col, Descriptions, Drawer, Button, List, Modal, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
const fakeDataUrl = 'http://api.cat-shop.penkuoer.com/api/v1/admin/products';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;



class Goodslist extends Component {
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
      ids: '',
      i: '',
      arr: [],
      token: "",
      placement: 'top',
      list: '',
      display: 'none'
    }

  }
  fetchData = callback => {
    reqwest({
      url: fakeDataUrl,
      method: 'get',
      data: { name: this.state.id, per: 10, page: this.state.pageNum },
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
      success: res => {
        callback(res);

      },
    });
  };
  showDrawer = () => {
    this.setState({ data: [] })
    let { data } = this.state;
    this.fetchData(res => {
      this.setState({ display: "block" })
      console.log(res)
      data = res.products;
      this.setState({
        data,
        loading: false,
      });
    });
  }

  componentWillMount() {
    this.setState({ token: localStorage.getItem("admintoken") })
  }

  componentDidMount() {
    let { data } = this.state;
    this.fetchData(res => {
      this.setState({ display: "block" })
      console.log(res)
      data = res.products;
      this.setState({
        data,
        loading: false,
      });
    });
  }
  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (this.state.pageNum > 5) {
      message.warning('商品列表已经加载完，没有更多数据');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData(res => {
      data = data.concat(res.products);
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
      ids: id,
      i: i
    });
  };
  handleOk = e => {
    reqwest({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/products/' + this.state.ids,
      method: 'delete',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
      success: res => {

        console.log(res)
        var i = this.state.i
        console.log(i)
        this.state.data.splice(i, 1)

        let { data } = this.state;
        this.fetchData(res => {
          this.setState({ display: "block" })
          console.log(res)
          data = data.concat(res.products);
          var pageNum = this.state.pageNum + 1
          this.setState({
            pageNum: pageNum,
            data,
            loading: false,
          });
        });
      },
    });
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  showChildrenDrawer = (id) => {
    console.log(id)
    reqwest({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/products/' + id,
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
  onChange = e => {
    this.setState({ id: e.target.value })
  };

  render() {
    return (
      <div>
        <div>
          <Row type="flex" justify="space-around" align="middle" style={{ height: "50px", textAlign: "center", color: "#19CAAD",fontSize:"24px" }}>
            <Col span={24}>
              <DemoBox value={120}>
              商品列表获取
              </DemoBox>
            </Col>
          </Row>
          
          <Row type="flex" justify="space-around" align="middle">
            <Col span={8} offset={8}>
              <DemoBox value={120}>
                <Input placeholder="请输入商品名字进行搜索" allowClear onChange={this.onChange} />
              </DemoBox>
            </Col>
            <Col span={8}>
              <DemoBox value={120}>
                <Button type="primary" onClick={this.showDrawer}>
                  点击搜索
            </Button>
              </DemoBox>
            </Col>
          </Row>
        </div>
        <div style={{ display: this.state.display }} className={userlist.demoinfinite}>
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
                    商品名称
                  </Col>
                  <Col className="gutter-row" span={11}>
                    商品id
                  </Col>
                  <Col className="gutter-row" span={4}>
                    状态管理
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
                    <Button type="danger" onClick={this.showModal.bind(this, item._id, i)}>删除</Button>,

                  ]} >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2939583987,3327046165&fm=115&gp=0.jpg" />
                    }
                    title={item.name}
                    description={item.descriptions}

                  />
                  <div>
                    <div style={{
                      marginRight: 100,
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
                      height={480}
                      placement={this.state.placement}
                      closable={false}
                      onClose={this.onChildrenDrawerClose}
                      visible={this.state.childrenDrawer}
                    >
                      <Descriptions layout="vertical" bordered>
                        <Descriptions.Item label="商品名字">{this.state.list.name}</Descriptions.Item>
                        <Descriptions.Item label="商品简介">{this.state.list.descriptions}</Descriptions.Item>
                        <Descriptions.Item label="数量">{this.state.list.quantity}</Descriptions.Item>
                        <Descriptions.Item label="价格">{this.state.list.price}</Descriptions.Item>
                        <Descriptions.Item label="商品图片"><img src={this.state.list.coverImg} alt="tupian" style={{ width: "60px" }} /></Descriptions.Item>
                        <Descriptions.Item label="商品id">{this.state.list.productCategory}</Descriptions.Item>
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
                          <NavLink to="/home/goods/revise">修改用户</NavLink>
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


export default Goodslist
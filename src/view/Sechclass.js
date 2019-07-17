import React, { Component } from "react"
import {Button, Input, Row, Col } from 'antd';
import axios from "axios"
import Action from "../redux/Action"
import Store from "../redux/Store"
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class Sechclass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      list:'',

    }
  }
  onChange = e => {
    this.setState({ id: e.target.value })
  };
  showDrawer = (e) => {
    var token = localStorage.getItem("admintoken")
    console.log(token)
    var that = this
    axios({
      url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/product_categories/' + this.state.id,
      method: 'get',
      headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
    }).then(function (res) {
    Store.dispatch(Action.ids(that.state.id))
    that.props.history.push("/home/class/amend")
      console.log(res)
      // that.setState({list:res.data})
    }).catch(function (err) {
      alert("请输入正确信息")
    })
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8} offset={4}>
            <DemoBox value={120}>
              <Input placeholder="请输入商品分类id进行搜索" allowClear onChange={this.onChange} />
            </DemoBox>
          </Col>
          <Col span={12}>
            <DemoBox value={120}>
              <Button type="primary" onClick={this.showDrawer}>
                点击搜索
            </Button>
            </DemoBox>
          </Col>
        </Row> 
      </div>
    )
  }
  componentDidMount() {
  }
}


export default Sechclass
import React, { Component } from "react"
import axios from 'axios';
import Store from "../redux/Store"

import { Modal, Result, Descriptions, Button, Input, Row, Col} from 'antd';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;



class Amend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ipt: '',
            list: '',
            token: '',
            id: Store.getState().username,
            display: "none",
            display2: "block",
            visible: false,
            userid: Store.getState().userid,
            address: '',


        }
        this.chanegeitem = this.chanegeitem.bind(this)
    }
    showModal = () => {


        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        var that = this
        axios({
            url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/orders/' + this.state.id,
            method: 'put',
            data: { isPayed: this.state.ipt,},
            headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
        }).then(function (res) {
            console.log(res)
            that.setState({ display: "block", display2: "none" })
        }).catch(function (err) {
            that.props.history.push("/home/order/orderlist")
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
        console.log(this.state.id)
        var that = this
        axios({
            url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/orders/' + this.state.id,
            method: 'get',
            headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.state.token },
        }).then(function (res) {
            if(res.data.receiver){
                that.setState({ list: res.data})
            }else{
                that.props.history.push("/home/order/classlist")
            }
            
        }).catch(function (err) {
             alert("请输入正确的商品分类id")
            that.props.history.push("/home/order/classlist")
           
        })

    }
    onChange = e => {
        this.setState({ ipt: e.target.value })
    };
    componentWillMount() {
        var token = localStorage.getItem("admintoken")
        this.setState({ token: token })
    }
    res = e => {
        this.setState({ display: "none", display2: "block" })
    };
    tap = e => {
        this.props.history.push('/home/order/orderlist')
    };
    render() {
        return (
            <div>
                <div style={{ display: this.state.display }}>
                    <Result
                        status="success"
                        title="页面修改完成"
                        subTitle="信息已经修改完成，请刷新用户列表页面查看"
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
                <Descriptions layout="vertical" bordered>
                      <Descriptions.Item label="客户名字">{this.state.list.receiver}</Descriptions.Item>
                      <Descriptions.Item label="商品价格">{this.state.list.price}</Descriptions.Item>
                      <Descriptions.Item label="订单id">{this.state.list.no}</Descriptions.Item>                     
                      <Descriptions.Item label="客户地址">{this.state.list.regions}</Descriptions.Item>
                      <Descriptions.Item label="创建日期">{this.state.list.createdAt}</Descriptions.Item>
                      <Descriptions.Item label="更新日期">{this.state.list.updatedAt}</Descriptions.Item>
                    </Descriptions>
                    <Row type="flex" justify="space-around" align="middle" style={{ height: "50px", textAlign: "center", color: "#19CAAD" }}>
                        <Col span={24}>
                            <DemoBox value={120}>
                                <Button type="primary" onClick={this.showModal} style={{ marginRight: 20 }}>
                                    修改支付状态
                    </Button>
                            </DemoBox>
                        </Col>
                    </Row>

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
                                                请输入true/false
                    </DemoBox>
                                        </Col>
                                    </Row>
                                    <Row type="flex" justify="space-around" align="middle">
                                        <Col span={24}>
                                            <DemoBox value={120}>
                                                <Input placeholder="支付状态" allowClear onChange={this.onChange} />
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


export default Amend
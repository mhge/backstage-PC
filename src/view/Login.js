import React, { Component } from "react"
import { Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';
import { NavLink } from "react-router-dom"
import Action from "../redux/Action"
import Store from "../redux/Store"
import axios from "axios"

import login from "../css/Login.module.css"
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            username:'',
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={login.tit}>
            <div className={login.str}></div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>

                        <Col span={10} offset={1}>
                            <img src="http://img2.imgtn.bdimg.com/it/u=2509469443,1652062333&fm=26&gp=0.jpg" className={login.img} alt="tupian"/>
                        </Col>
                        <Col span={5} offset={2}>
                        <div className={login.top}></div>
                            <Form onSubmit={this.handleSubmit} className={login.form}>
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={24}>
                                        <Form.Item>
                                            {getFieldDecorator('username', {
                                                rules: [{ required: true, message: 'Please input your username!' }],
                                            })(
                                                <Input
                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Username"
                                                />,
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={24}>
                                        <Form.Item>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: 'Please input your Password!' }],
                                            })(
                                                <Input
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    type="Password"
                                                    placeholder="Password" />,
                                            )}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-around" align="middle">
                                    <Col span={24}>
                                        <Form.Item>
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Col span={24}>
                                                    {getFieldDecorator('remember', {
                                                        valuePropName: 'checked',
                                                        initialValue: true,
                                                    })(<Checkbox>点击确认</Checkbox>)}
                                                    <a className={login.forgot} href="">
                                                        忘记密码
                                                </a>
                                                </Col>
                                            </Row>
                                            <Row type="flex" justify="space-around" align="middle">
                                                <Col span={24}>
                                                    <Button type="primary" htmlType="submit" className={login.button}>
                                                        登录
                                                </Button>
                                                </Col>
                                            </Row>

                                            <NavLink to="/">立即注册!</NavLink>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }
    handleSubmit = e => {
        var that = this
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Store.dispatch(Action.name(values.username))

                axios({
                    method:'post',
                    url:"http://api.cat-shop.penkuoer.com/api/v1/auth/manager_login",
                    data:{userName: values.username, password: values.password},
                }).then(function(res){
                    if (res.data.code =="success") {
                                    alert("登录成功")
                                    Store.dispatch(Action.tokens(res.data.token))
                                    localStorage.setItem('admintoken',res.data.token)
                                    that.props.history.push("/home/admin")
                                }
                }).catch(function(err){
                    alert("登录失败")

                })
            }
        })
    }
    componentDidMount() {

    }

}
const WrappedLogin = Form.create({})(Login);


export default WrappedLogin
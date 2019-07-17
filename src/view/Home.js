import React, { Component } from "react"
import Store from "../redux/Store"
import Admin from "./Admin"
import Userlist from "./Userlist"
import Userdetail from "./Modify"
import Add from "./Addlist"
import Sechuser from "./Sechuser"
import Right from "./Right"
import Goods from "./Goods"
import Class from "./Class"
import Order from "./Order"

import { Breadcrumb, Layout, Menu,  Icon,  } from 'antd';
import { NavLink, Route, Redirect, HashRouter as Router, } from "react-router-dom"
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: Store.getState().token,
            name: Store.getState().username,
            collapsed: false,

        }
        this.chanegeitem = this.chanegeitem.bind(this)
    }
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Layout style={{ minHeight: '100vh' }}>
                            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                                <div className="logo" />
                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                    <SubMenu
                                        key="sub1"
                                        title={
                                            <span>
                                                <Icon type="user" />
                                                <span>管理员</span>
                                            </span>
                                        }
                                    >
                                        <Menu.Item key="3"><NavLink to="/home/admin">管理员信息</NavLink></Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        title={
                                            <span>
                                                <Icon type="team" />
                                                <span>用户信息管理</span>
                                            </span>
                                        }
                                    >
                                        <Menu.Item key="6"><NavLink to="/home/userlist">用户信息列表</NavLink></Menu.Item>
                                        <Menu.Item key="8"><NavLink to="/home/addlist">增加用户信息</NavLink></Menu.Item>                                       
                                        <Menu.Item key="7"><NavLink to="/home/sechuser">id搜索用户信息</NavLink></Menu.Item>
                                        
                                    </SubMenu>
                                   
                                    <SubMenu
                                        key="sub3"
                                        title={
                                            
                                            <span>
                                                <Icon type="file" />
                                                商品管理 
                                            </span>
                                          
                                        }
                                    >
                                        
                                        <Menu.Item key="4" ><NavLink to="/home/goods/goodslist" >关键字查询商品信息列表</NavLink></Menu.Item>
                                        <Menu.Item key="5" ><NavLink to="/home/goods/addgoods" >增加商品信息</NavLink></Menu.Item>
                                        <Menu.Item key="9"><NavLink to="/home/goods/sechgoods">id搜索商品信息</NavLink></Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub4"
                                        title={
                                            
                                            <span>
                                                <Icon type="file" />
                                                商品分类管理 
                                            </span>
                                          
                                        }
                                    >
                                        
                                        <Menu.Item key="10" ><NavLink to="/home/class/classlist" >关键字获取商品分类信息</NavLink></Menu.Item>
                                        <Menu.Item key="11" ><NavLink to="/home/class/addclass" >增加商品分类信息</NavLink></Menu.Item>
                                        <Menu.Item key="12"><NavLink to="/home/class/sechclass">id搜索商品信息</NavLink></Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub5"
                                        title={
                                            
                                            <span>
                                                <Icon type="file" />
                                                订单管理 
                                            </span>
                                          
                                        }
                                    >
                                        
                                        <Menu.Item key="13" ><NavLink to="/home/order/orderlist" >搜索获取订单信息</NavLink></Menu.Item>
                                        <Menu.Item key="14"><NavLink to="/home/order/sechorder">id搜索订单信息</NavLink></Menu.Item>
                                    </SubMenu>
                                   
                                </Menu>
                            </Sider>
                            <Layout>
                                {/* <Header>
                                    <div className="logo" />
                                </Header> */}
                                <Content style={{ margin: '0 16px' }}>
                                    <Breadcrumb style={{ margin: '16px 0' }}>
                                        {/* <Breadcrumb.Item>User</Breadcrumb.Item> */}
                                        <Breadcrumb.Item></Breadcrumb.Item>
                                    </Breadcrumb>
                                    <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
                                        
                                        <Route path="/home/admin" component={Admin} />
                                        <Route path="/home/userlist" component={Userlist} />
                                        <Route path="/home/modify" component={Userdetail} />
                                        <Route path="/home/addlist" component={Add} />
                                        <Route path="/home/sechuser" component={Sechuser} />      
                                        <Route path="/home/goods" component={Goods}/>    
                                        <Route path="/home/class" component={Class}/>    
                                        <Route path="/home/order" component={Order}/>                                      
                                        <Route path="/home/right" component={Right} />
                                      



                                        {/* <Redirect to="/home/admin" /> */}
                                        
                                    </div>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                    </div>
                </Router>
            </div>
        )
    }
    chanegeitem() {
        this.setState({
            token: Store.getState().token,
            name: Store.getState().username,

        })
    }
    componentDidMount() {
        Store.subscribe(this.chanegeitem)
    }
}



export default Home
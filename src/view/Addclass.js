import React, { Component } from "react"
import axios from 'axios';


import { Result ,Button,Input,Row, Col ,} from 'antd';
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;



class Addclass extends Component {
    constructor(props) {
        super(props)
        this.state={
          ipt:'',
          ipt1:'',
          ipt2:'',
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
        url: 'http://api.cat-shop.penkuoer.com/api/v1/admin/product_categories',
        method: 'post',
        data:{name:this.state.ipt,descriptions:this.state.ipt1,coverImg:this.state.ipt2,},
        headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + token },
    }).then(function(res){
          console.log(res)
          that.setState({display:"block",displays:"none"})
    }).catch(function(err){
      that.props.history.push("/home/goods/addgoods")
    })
    };
    onChange = e => {
      this.setState({ipt:e.target.value})
    };
    onChange1 = e => {
      this.setState({ipt1:e.target.value})
    };
    onChange2 = e => {
      this.setState({ipt2:e.target.value})
    };
  
    componentWillMount() {
     
    }
    res = e => {
        this.props.history.push("/home/goods/goodslist")
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
                    <Input placeholder="商品名字" allowClear onChange={this.onChange} />
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Input placeholder="商品简介" allowClear onChange={this.onChange1} />
                    </DemoBox>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                  <Col span={24}>
                    <DemoBox value={120}>
                    <Input placeholder="请输入网络图片地址" allowClear onChange={this.onChange2} />
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


export default Addclass
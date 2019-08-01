import React,{Component} from 'react';
import styles from './index.less';
import {connect} from "react-redux";
import {actionCreators } from './../store/index.jsx';
import { Card,Descriptions, Row,Slider,Badge,Table,Icon,Pagination,Tag,Button } from 'antd';
import { Link }     from 'react-router-dom';
class MallAdminOrderDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            orderNumber:this.props.match.params.orderNumber,
            orderItemVoList:this.props.orderInfo.orderItemVoList,

        }
    }
    columns = [
      {
        title: '商品图片',
        dataIndex: 'productImage',
        key: 'productImage',
        width: 232,
        render:(value,record)=>{
            const{ imageHost } = this.props.orderInfo;
            return (
                <img className="p-img"  alt={record.productName}
                    src={`${imageHost}${value}`}
                />
            )
        }
      },
      {
        title: '商品信息',
        dataIndex: 'productName',
        key: 'productName',
      },
      {
        title: '单价',
        dataIndex: 'currentUnitPrice',
        key: 'currentUnitPrice',
        width:100,
        render:value=>{
            return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      },
      {
        title: '数量',
        key: 'quantity',
        dataIndex: 'quantity',
        width:80,
      },
      {
        title: '合计',
        key: 'totalPrice',
        dataIndex: 'totalPrice',
        width:110,
        render:value=>{
            return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      },
    ];
    marks = {
      0: '提交订单',
      25: '已支付',
      50: '待发货',
      75: '买家已收货',
      100: '交易成功'
    };
    componentDidMount(){
        this.props.getOrderInfo(this.state.orderNumber);
    }
    statusList={
        "未支付":0,
        "已取消":0
    }
    render(){
        const{ orderNo,createTime,payment,paymentTypeDesc,orderItemVoList,statusDesc } = this.props.orderInfo;
        return (

            <div className={styles.detail}>
                <Card
                    title="订单进展"
                    style={{marginBottom:'20px',border:'none'}}
                >
                    <Slider marks={this.marks} step={null} value={this.statusList[statusDesc]} defaultValue={0} style={{width:'600px',margin:'40px auto 30px'}}
                    />
                </Card>
                <Descriptions title="订单信息" bordered style={{marginBottom:'20px'}}>
                    <Descriptions.Item label="订单号" span={3}>{orderNo}</Descriptions.Item>
                    <Descriptions.Item label="下单时间" span={3}>{createTime}</Descriptions.Item>
                    <Descriptions.Item label="订单状态" span={3}>
                      <Badge status="warning" text={statusDesc} />
                    </Descriptions.Item>
                    <Descriptions.Item label="订单金额">{`￥ ${payment}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Descriptions.Item>
                    <Descriptions.Item label="支付方式" span={3}>{paymentTypeDesc}</Descriptions.Item>

                    <Descriptions.Item label="物流方式">顺丰快递</Descriptions.Item>
                    <Descriptions.Item label="快递单号" span={3}>
                      46871455347163916
                    </Descriptions.Item>
                    <Descriptions.Item label="买家留言"></Descriptions.Item>
                  </Descriptions>
                <Card
                    title="商品信息"
                    style={{marginBottom:'20px',border:'none'}}
                >
                    <Table columns={this.columns} dataSource={orderItemVoList} bordered pagination={false}/>
                </Card>
                <Card
                    title="收货人信息"
                    style={{marginBottom:'30px',border:'none'}}
                >
                    <Row className={styles.title} style={{marginTop:'10px'}}><span>姓名：</span>傲娇的萌</Row>
                    <Row className={styles.title} style={{marginTop:'10px'}}><span>联系方式：</span>傲娇的萌</Row>
                    <Row className={styles.title} style={{marginTop:'10px'}}><span>收货地址：</span>傲娇的萌</Row>
                    <Row className={styles.title} style={{marginTop:'10px'}}><span>邮编：</span>傲娇的萌</Row>
                    <Row className={styles.title} style={{marginTop:'10px'}}><span>发票类型：</span>傲娇的萌</Row>
                    <Row className={styles.title} style={{marginTop:'10px'}}><span>发票抬头：</span>傲娇的萌</Row>
                </Card>
                <div className={styles.backBtn}>
                    <Link to={`/mallAdmin/order`} >
                        <Button type="primary" style={{marginBottom:'30px'}}><Icon type="left" />点击返回订单列表</Button>
                    </Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    orderInfo: state.getIn(['order','orderInfo'])
})
const mapDispatchToProps = (dispatch) => ({
    getOrderInfo(orderNumber){
        dispatch(actionCreators.getOrderInfo(orderNumber))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MallAdminOrderDetail);

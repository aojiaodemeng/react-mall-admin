import React,{Component} from 'react';
import './index.less';
import {connect} from "react-redux";
import {actionCreators } from './store/index.jsx';
import { Table,Pagination,Tag,Button } from 'antd';
import { Link }     from 'react-router-dom';
class MallAdminOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            pageNum:1,
            pageSize:7,
            total:500,
        }
    }
    columns = [
      {
        title: '订单号',
        dataIndex: 'orderNo',
        key: 'orderNo',
      },
      {
        title: '收件人',
        dataIndex: 'receiverName',
        key: 'receiverName',
      },
      {
        title: '订单状态',
        dataIndex: 'statusDesc',
        key: 'statusDesc',
        render:(value,record)=> {
            let color = "green";
            let keyContent = "";
            if (value === '未支付') {
                color = "purple";
                keyContent = "1"+String(record.orderNo);
            }else if(value === '已取消'){
                color = "red";
                keyContent = "2"+String(record.orderNo);
            }
            return <Tag color={color} key={keyContent}>{value}</Tag>
        }
      },
      {
        title: '订单总价',
        key: 'payment',
        dataIndex: 'payment',
        render:value=>{
            return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      },
      {
        title: '下单时间',
        key: 'createTime',
        dataIndex: 'createTime',
        render:value=>{
            return new Date(value).toLocaleString()
        }
      },
      {
        title: '操作',
        key: 'operate',
        dataIndex: 'operate',
        render:(value,record)=> {
            return <Link to={`/mallAdmin/order/detail/${record.orderNo}`}><Button type="primary">详情</Button></Link>
        },
      },
    ];
    componentDidMount(){
        if(localStorage.orderPageNum){
            this.setState({
                pageNum: parseInt(localStorage.orderPageNum)
            });
            this.props.getOrderList(localStorage.orderPageNum,this.state.pageSize);
        }else{
            this.props.getOrderList(this.state.pageNum,this.state.pageSize);
        }
    }
    onPageNumChange = (pageNumber) => {
        this.setState({
            pageNum:pageNumber
        },()=>{
            this.props.getOrderList(this.state.pageNum,this.state.pageSize);
        })
    }

    render(){
        const tableProps = {
            columns:this.columns,
            dataSource:this.props.orderList,
            pagination:false,
            rowKey:record=>String(record.orderNo)
        }
        return (
            <div className="wrap">
                <Table {...tableProps}/>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={this.onPageNumChange} showQuickJumper style={{marginTop:'10px'}}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    orderList: state.getIn(['order','orderList'])
})
const mapDispatchToProps = (dispatch) => ({
    getOrderList(pageNum,pageSize){
        dispatch(actionCreators.getOrderList(pageNum,pageSize))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MallAdminOrder);

import React,{Component} from 'react';
import './index.less';
import {connect} from "react-redux";
import {actionCreators } from './store/index.jsx';
import { Table,Pagination,Tag,Button } from 'antd';
import { Link }     from 'react-router-dom';
class MallAdminProduct extends Component{
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
        title: '商品ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: 600,
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render:value=>{
            return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render:(value,record)=> {
            let color = "green";
            let keyContent = "";
            let content = ""
            if (value === 1) {
                color = "purple";
                keyContent = "1"+String(record.id);
                content = '在售';
            }else if(value === 2){
                color = "red";
                keyContent = "2"+String(record.id);
                content = '已下架';
            }
            return <Tag color={color} key={keyContent}>{content}</Tag>
        }
      },
      {
        title: '操作',
        key: 'operate',
        dataIndex: 'operate',
         render:(value,record)=> {
            return (
                <div>
                    <Button
                        onClick={(e)=>{this.onSetProductStatus(e,record.id,record.status)}}
                        className="btn btn-warning btn-xs"
                        size="small"
                        style={{marginRight: '10px'}}
                    >{record.status == 1 ? '下架' : '上架'}</Button>
                </div>
            )
        },
      },
    ];
    componentDidMount(){
        if(localStorage.productPageNum){
            this.setState({
                pageNum: parseInt(localStorage.productPageNum)
            });
            this.props.getProductList(localStorage.productPageNum,this.state.pageSize);
        }else{
            this.props.getProductList(this.state.pageNum,this.state.pageSize);
        }
    }
    onPageNumChange = (pageNumber) => {
        this.setState({
            pageNum:pageNumber
        },()=>{
            this.props.getProductList(this.state.pageNum,this.state.pageSize);
        })
    }
    //改变商品状态
    onSetProductStatus(e,productId,currentStatus){
        const _this = this;
        let newStatus = currentStatus == 1? 2:1,
            confirmTips = currentStatus == 1 ? '确定要下架该商品吗？' : '确定要上架该商品吗？';
            if(window.confirm(confirmTips)){
                _this.props.setProductStatus(productId,newStatus);
            }
    }
    render(){
        const tableProps = {
            columns:this.columns,
            dataSource:this.props.productList,
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
    productList: state.getIn(['product','productList'])
})
const mapDispatchToProps = (dispatch) => ({
    getProductList(pageNum,pageSize){
        dispatch(actionCreators.getProductList(pageNum,pageSize))
    },
    setProductStatus(productId,newStatus){
        dispatch(actionCreators.setProductStatus(productId,newStatus))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MallAdminProduct);

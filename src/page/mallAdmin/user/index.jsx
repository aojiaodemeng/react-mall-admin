import React,{Component} from 'react';
import './index.less';
import {connect} from "react-redux";
import {actionCreators } from './store/index.jsx';
import { Table,Pagination } from 'antd';
class MallAdminUser extends Component{
    constructor(props){
        super(props);
        this.state={
            pageNum:1,
            pageSize:8,
            userList:[],
            total:500
        }
    }
    columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '手机号码',
        key: 'phone',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        key: 'createTime',
        dataIndex: 'createTime',
        render:value=>{
            return new Date(value).toLocaleString()
        }
      },
    ];
    data=[];
    componentDidMount(){
        this.props.getUserList(this.state.pageNum,this.state.pageSize);
    }
    onPageNumChange = (pageNumber) => {
        this.setState({
            pageNum:pageNumber
        },()=>{
            this.props.getUserList(this.state.pageNum,this.state.pageSize);
        })
    }
    render(){
        return (
            <div className="wrap">
                <Table columns={this.columns} dataSource={this.props.userList} pagination={false}/>
                <Pagination defaultCurrent={this.state.pageNum} total={this.state.total} onChange={this.onPageNumChange} showQuickJumper style={{marginTop:'10px'}}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    userList: state.getIn(['user','userList'])
})
const mapDispatchToProps = (dispatch) => ({
    getUserList(pageNum,pageSize){
        dispatch(actionCreators.getUserList(pageNum,pageSize))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MallAdminUser);

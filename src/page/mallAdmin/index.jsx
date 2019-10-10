import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import { Col,Row } from 'antd';
const _mm = new MUtil();
import './index.scss'
class MallAdmin extends Component{
	constructor(props){
        super(props);
        this.state = {
            userCount       : '-',
            productCount    : '-',
            orderCount      : '-'
        }
    }
    componentDidMount(){
        this.loadCount();
    }
    loadCount(){
        _mm.request({
            url: '/manage/statistic/base_count.do'
        }).then(res=>{
        	this.setState(res.data);
        });
    }
	render(){
		return (
			<div id="page-wrapper">
                <Row>
                    <Col span={8}>
                        <Link to="/mallAdmin/user" className="color-box brown">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/mallAdmin/product" className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </Col>
                    <Col span={8}>
                        <Link to="/mallAdmin/order" className="color-box blue">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </Col>
                </Row>
            </div>
		)
	}
}
export default MallAdmin;
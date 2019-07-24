import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import { DatePicker, Button } from 'antd';
import './index.less';
class HeaderTop extends Component{
    render(){
        return(
            <div className="header-top">
                <div className="content">
                    <div className="left">
                        <span>您好，欢迎光临</span>
                        <Link to="/" className="light">React Mall Admin</Link>
                    </div>
                    <div className="right">
                        <span className="loginBtn">登录</span>
                        <span>注册</span>
                    </div>
                </div>

            </div>
        )
    }
}
export default HeaderTop;

import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import {DatePicker, Button, Menu, Icon} from 'antd';
import './index.less';
const { SubMenu } = Menu;
class HeaderTop extends Component{
    constructor(props){
        super(props);
        this.state={
            current: 'home',
            lineHeight: "big"
        }
    }
    handleClick = e => {
        this.setState({
          current: e.key,
        });
    };
    handleScroll = () => {
        window.addEventListener('scroll',()=> {
            let nav = this.refs.headerNav;
            let clear = this.refs.clear;
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if(scrollTop < 40){
                this.setState({
                    lineHeight: 'big'
                });
                nav.style.position = 'absolute';
                nav.style.top = '40px';
                nav.style.height = '100px';
                clear.style.height = '100px';
            }else{
                this.setState({
                    lineHeight: 'small'
                });
                nav.style.position = 'fixed';
                nav.style.top = '0px';
                nav.style.height = '54px';
                clear.style.height = '54px';
            }
        })

    }
    componentDidMount(){
        this.handleScroll();
	}
    render(){
        return(
            <div>
                <div className="header-top" ref="headerTop">
                    <div className="topContent">
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
                <div className="header-nav" ref="headerNav">
                    <div className="navContent">
                        <Menu className={this.state.lineHeight} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="home" />
                                    主页
                                </Link>
                            </Menu.Item>
                            <SubMenu
                              title={
                                <span className="submenu-title-wrapper">
                                  <Icon type="inbox" />
                                  电商后台
                                </span>
                              }
                            >
                                <Menu.Item key="mallAdmin:4">数据总览</Menu.Item>
                                <Menu.Item key="mallAdmin:product"><Link to="/mallAdmin/product">商品管理</Link></Menu.Item>
                                <Menu.Item key="mallAdmin:2">订单管理</Menu.Item>
                                <Menu.Item key="mallAdmin:user"><Link to="/mallAdmin/user">用户管理</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>

                </div>
                <div className="clear" ref="clear">

                </div>
            </div>
        )
    }
}
export default HeaderTop;

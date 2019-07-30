import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import {DatePicker, Button, Menu, Icon} from 'antd';
import MUtil from 'util/mm.jsx';
import styles from './index.less';
import {connect} from "react-redux";

const _mm = new MUtil();
const { SubMenu } = Menu;
class HeaderTop extends Component{
    constructor(props){
        super(props);
        this.state={
            current: 'home',
            lineHeight: "big",
            username: _mm.getStorage('userInfo').username
        }
    }
    componentDidMount(){
        this.handleScroll();
	}
	handleMenuClick = e => {
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
	loginOut = () => {
        _mm.request({
            type:'post',
            url:'/user/logout.do'
        }).then(res=>{
            _mm.removeStorage('userInfo');
            window.location.href='/';
        })
    }
    render(){
        return(
            <div>
                <div className={styles.top} ref="headerTop">
                    <div className={styles.contentWrap}>
                        <div>
                            {
                                this.state.username ?
                                <span className={styles.light}>{this.state.username}，</span> :
                                <span className={styles.light}></span>
                            }
                            <span className={styles.gray}>您好，</span>
                            <span>欢迎</span>
                            <Link to="/" className={styles.light}>React Mall Admin</Link>
                        </div>
                        <div>
                            {
                                this.state.username ?
                                <Button
                                    onClick = {this.loginOut}
                                    size="small"
                                >退出</Button> :
                                <Link to="/login" className="gray">登录</Link>
                            }
                        </div>
                    </div>

                </div>
                <div className={styles.nav} ref="headerNav">
                    <div className={styles.contentWrap}>
                        <Menu className={this.state.lineHeight} onClick={this.handleMenuClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="home" />
                                    主页
                                </Link>
                            </Menu.Item>
                            <SubMenu
                              title={
                                <span>
                                  <Icon type="inbox" />
                                  电商后台
                                </span>
                              }
                            >
                                <Menu.Item key="mallAdmin:4">数据总览</Menu.Item>
                                <Menu.Item key="mallAdmin:product"><Link to="/mallAdmin/product">商品管理</Link></Menu.Item>
                                <Menu.Item key="mallAdmin:order"><Link to="/mallAdmin/order">订单管理</Link></Menu.Item>
                                <Menu.Item key="mallAdmin:user"><Link to="/mallAdmin/user">用户管理</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>

                </div>
                <div className={styles.clear} ref="clear">

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps,mapDispatchToProps)(HeaderTop);

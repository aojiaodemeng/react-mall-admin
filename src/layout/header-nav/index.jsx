import React,{Component} from 'react';
import { Link }     from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.less';
const { SubMenu } = Menu;
class HeaderNav extends Component{
    constructor(props){
        super(props);
        this.state={
            current: 'home',
        }
    }
    handleClick = e => {
        this.setState({
          current: e.key,
        });
    };
    componentDidMount(){

	}
    render(){
        return(
            <div className="header-nav">
                <div className="content">
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
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
        )
    }
}
export default HeaderNav;

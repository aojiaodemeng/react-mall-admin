import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import MallAdminIndex from './index.jsx';
import MallAdminProductList from './product/index.jsx';
import MallAdminOrderList from './order/index.jsx';
import MallAdminOrderDetail from './order/detail/index.jsx';
import MallAdminUserList from './user/index.jsx';
class MallAdminProduct extends Component{
    componentWillMount(){
        document.title = '电商后台 - React Mall Admin';
    }
    render(){
        return (
            <Switch>
                <Route path="/mallAdmin/index" component={MallAdminIndex}></Route>
                <Route path="/mallAdmin/product" component={MallAdminProductList}></Route>
                <Route path="/mallAdmin/order/index" component={MallAdminOrderList}></Route>
                <Route path="/mallAdmin/order/detail/:orderNumber" component={MallAdminOrderDetail}></Route>
                <Route path="/mallAdmin/user" component={MallAdminUserList}></Route>
                <Redirect exact from="/mallAdmin" to="/mallAdmin/index"/>
                <Redirect exact from="/mallAdmin/order" to="/mallAdmin/order/index"/>
            </Switch>
        )
    }
}
export default MallAdminProduct;

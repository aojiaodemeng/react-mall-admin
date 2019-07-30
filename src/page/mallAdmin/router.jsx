import React,{Component} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Product from './product/index.jsx';
import Order from './order/index.jsx';
import User from './user/index.jsx';
class MallAdminProduct extends Component{
    componentWillMount(){
        document.title = '电商后台 - React Mall Admin';
    }
    render(){
        return (
            <Switch>
                <Route path="/mallAdmin/product" component={Product}></Route>
                <Route path="/mallAdmin/order" component={Order}></Route>
                <Route path="/mallAdmin/user" component={User}></Route>
                <Redirect exact from="/mallAdmin" to="/product/product"/>
            </Switch>
        )
    }
}
export default MallAdminProduct;

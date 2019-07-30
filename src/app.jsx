import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.jsx';
import Layout from 'layout/index.jsx';
import Login from 'page/login/index.jsx';
import Home from 'page/home/index.jsx';
import MallAdmin from 'page/mallAdmin/router.jsx';
// import './index.less';
class App extends Component{
  render(){
      let LayoutRouter = (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/mallAdmin" component={MallAdmin} />
            </Switch>
        </Layout>
      )
    return (
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" render = {
                props => (LayoutRouter)
            }/>
          </Switch>
        </Router>
    )
  }
}

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
  document.getElementById('app')
);

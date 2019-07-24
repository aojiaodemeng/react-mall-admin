import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Layout from 'layout/index.jsx';
import Home from 'page/home/index.jsx';
import MallAdmin from 'page/mallAdmin/router.jsx';
import './index.less';
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
            <Route path="/" render = {
                props => (LayoutRouter)
            }/>
          </Switch>
        </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

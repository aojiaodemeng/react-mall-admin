import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';
class App extends Component{
  render(){
      let LayoutRouter = (
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Layout>
      )
    return (
        <Router>
          <Switch>
            <Route exact path="/" render = {
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

import React,{Component} from 'react';

import Header from './header/index.jsx';
// import HeaderNav from './header-nav/index.jsx';
import './theme.less';
class Layout extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="wrapper">
                <Header />

				{this.props.children}
			</div>
		);
	}
}
export default Layout;

import React,{Component} from 'react';

import NavTop from './../nav-top/index.jsx';
class Layout extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="wrapper">
                <NavTop />
				{this.props.children}
			</div>
		);
	}
}
export default Layout;

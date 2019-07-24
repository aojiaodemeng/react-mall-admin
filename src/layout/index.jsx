import React,{Component} from 'react';

import HeaderTop from './header-top/index.jsx';
import HeaderNav from './header-nav/index.jsx';
import './theme.less';
class Layout extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="wrapper">
                <HeaderTop />
                <HeaderNav />
				{this.props.children}
			</div>
		);
	}
}
export default Layout;

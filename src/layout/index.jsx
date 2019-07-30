import React,{Component} from 'react';
import Header from './header/index.jsx';
import styles from './theme.less';
class Layout extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="wrapper">
                <Header />
				<div className={styles.contentWrap}>
					{this.props.children}
				</div>

			</div>
		);
	}
}
export default Layout;

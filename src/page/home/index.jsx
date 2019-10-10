import React,{Component} from 'react';
class Home extends Component{
    componentWillMount(){
        document.title = '首页 - React Mall Admin';
    }
    render(){
        return (
            <div>Home
            </div>
        )
    }
}
export default Home;

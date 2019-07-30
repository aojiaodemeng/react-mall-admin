import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import MUtil from 'util/mm.jsx';


import { actionCreators } from './store/index.jsx';
import styles from './index.less';

const _mm = new MUtil();
class Login extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount(){
        document.title = '登录 - React Mall Admin';
    }

    onSubmit = (e) => {
       e.preventDefault();
       const { getFieldDecorator,validateFields,getFieldsValue } = this.props.form;
        validateFields((errors,value)=>{
            if(errors){
                return;
            }else{
                let loginInfo = {
                    username: value.username,
                    password: value.password
                }
                _mm.request({
                    type:'post',
                    url:'/manage/user/login.do',
                    data:loginInfo
                }).then((res)=>{
                    //保存登录信息
                    _mm.setStorage('userInfo', res.data);
                    //登录后跳转
                    let redirect = _mm.getUrlParam('redirect') || '';
                    _mm.loginToWeb(redirect);
                }).catch(()=>{
                })

            }
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        // const { loginStatus } = this.props;
        if(true){
            return (
                <div className={styles.loginWrap}>
                    <Form onSubmit={this.onSubmit} className="login-form" >
                        <Form.Item>
                          {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                            <Input
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              placeholder="admin"
                            />,
                          )}
                        </Form.Item>
                        <Form.Item>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                            <Input.Password
                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              type="password"
                              placeholder="admin"
                            />,
                          )}
                        </Form.Item>
                        <Form.Item>
                          <Button
                              type="primary"
                              className="login-form-button"
                              htmlType="submit"
                          >
                            登录
                          </Button>
                        </Form.Item>
                      </Form>
                </div>
            )
        }else{
            return <Redirect to='/'/>
        }
    }
}
const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create({
    mapPropsToFields(props){},    //把父组件属性映射到表单上（把Redux store中的值读出），可以给表单赋值
    onFieldsChange(props,changedFields){}, //当Form.Item子节点的值发生改变时触发，可以把对应的值转存到Redux store里面。
    onValuesChange(props,changedValues,allValues){}  //任一表单域的值发生改变时的回调
})(Login));

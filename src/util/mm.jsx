import axios from 'axios';
import { Modal } from 'antd';
import Qs from 'qs';
class MUtil{
	request(param){
        return new Promise((resolve, reject) => {
            axios({
                url      : param.url,
                responseType : param.dataType        ||'json',
                method   : param.type                     || 'get',
                data     : param.data || '',
                transformRequest: [function (data) {
                    let ret = '';
                    for (let i in data){
                        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
                    }
                    return ret;
                }],
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then((response) => {
                if(response.status == '200'){
                    let res = response.data
                    if(res.status === 0){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            }).catch((err)=>{
                reject(err)
            })
        });
    }
    request_notForm(param){
        return new Promise((resolve, reject) => {
            axios({
                url      : param.url,
                responseType : param.dataType        ||'json',
                method   : param.type                     || 'get',
                data     : param.data || '',
            }).then((response) => {
                if(response.status == '200'){
                    let res = response.data
                    if(res.status === 0){
                        resolve(res)
                    }else{
                        Modal.info({
                            title:'提示',
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data)
                }
            }).catch((err)=>{
                reject(err)
            })
        });
    }
	// 跳转登陆
	doLogin(){
		window.location.href="/login?redirect="+encodeURIComonent(window.location.pathname)
	}
	//获取Url参数
	getUrlParam(){
		//   XXXX.com?param=123&param1=456
		let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
            //result : ['param=123','','123','&']
        return result ? decodeURIComponent(result[2]) : null;
	}
	//登录后跳转
    loginToWeb(redirect){
	    window.location.pathname=redirect;
    }
	//存储
	setStorage(name, data){
		let dataType = typeof data;
		//JSON类型
		if(dataType === 'object'){
			window.localStorage.setItem(name, JSON.stringify(data));
		}
		//基础类型
		else if(['number','string','boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name,data);
		}
		//其他不支持的类型
		else{
			alert('该类型不能用于本地存储')
		}
	}
	//取出存储内容
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else{
			return '';
		}
	}
	//删除存储内容
	removeStorage(name){
		window.localStorage.removeItem(name);
	}
}
export default MUtil;

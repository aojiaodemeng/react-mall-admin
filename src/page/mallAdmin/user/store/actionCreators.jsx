import * as constants from './constants.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();


const changeUserList = (data) => ({
    type:constants.GET_USER_LIST,
    value:data
})
export const getUserList = (pageNum,pageSize) => {
    return (dispatch)=>{
        _mm.request({
            type:'post',
            url:'/manage/user/list.do',
            data:{
                pageNum:pageNum,
                pageSize:pageSize
            }
        }).then(res=>{
            dispatch(changeUserList(res.data.list));
        })
    }
}

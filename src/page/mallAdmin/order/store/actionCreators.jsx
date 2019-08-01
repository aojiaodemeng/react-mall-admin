import * as constants from './constants.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();


const changeOrderList = (data) => ({
    type:constants.GET_ORDER_LIST,
    value:data
})
const changeOrderInfo = (data) => ({
    type:constants.GET_ORDER_DETAIL,
    value:data
})
export const getOrderList = (pageNum,pageSize) => {
    return (dispatch)=>{
        _mm.request({
            type:'post',
            url:'/manage/order/list.do',
            data:{
                pageNum : pageNum,
                pageSize: pageSize
            }
        }).then(res=>{
            dispatch(changeOrderList(res.data.list));
            localStorage.setItem('orderPageNum',pageNum);
        })
    }
}
export const getOrderInfo = (orderNumber) => {
    return (dispatch) => {
        _mm.request({
            type:'post',
            url:'/manage/order/detail.do',
            data:{
                orderNo : orderNumber
            }
        }).then(res=>{
            dispatch(changeOrderInfo(res.data))
        })
    }
}

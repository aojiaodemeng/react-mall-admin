import * as constants from './constants.jsx';
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();


const changeProductList = (data) => ({
    type:constants.GET_PRODUCT_LIST,
    value:data
})
const changeProductInfo = (data) => ({
    type:constants.GET_PRODUCT_DETAIL,
    value:data
})
export const getProductList = (pageNum,pageSize) => {
    return (dispatch)=>{
        _mm.request({
            type:'post',
            url:'/manage/product/list.do',
            data:{
                pageNum : pageNum,
                pageSize: pageSize
            }
        }).then(res=>{
            dispatch(changeProductList(res.data.list));
            localStorage.setItem('productPageNum',pageNum);
        })
    }
}
export const getProductInfo = (productId) => {
    return (dispatch) => {
        _mm.request({
            type:'post',
            url:'/manage//product/detail.do',
            data:{
                productId:productId || 0
            }
        }).then(res=>{
            dispatch(changeProductInfo(res.data))
        })
    }
}
export const setProductStatus = (productId,newStatus) => {
    return (dispatch) => {
        _mm.request({
            type:'post',
            url:'/manage/product/set_sale_status.do',
            data:{
                productId,
                status:newStatus
            }
        }).then(res=>{
            alert(res.data || '操作成功！');
            dispatch(getProductList(localStorage.productPageNum,7))
        },errMsg => {
            alert(errMsg || '好像哪里不对了~');
        });

    }
}
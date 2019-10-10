import { fromJS } from 'immutable';
import * as constants from './constants.jsx';
const defaultState = fromJS({
	productList: [],
	productInfo: {},
});
export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_PRODUCT_LIST:
			return state.set('productList', action.value);
		case constants.GET_PRODUCT_DETAIL:
			return state.set('productInfo', action.value);
		default:
			return state;
	}
}

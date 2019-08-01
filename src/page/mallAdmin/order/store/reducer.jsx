import { fromJS } from 'immutable';
import * as constants from './constants.jsx';
const defaultState = fromJS({
	orderList: [],
	orderInfo:{},
});
export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_ORDER_LIST:
			return state.set('orderList', action.value);
		case constants.GET_ORDER_DETAIL:
			return state.set('orderInfo', action.value);
		default:
			return state;
	}
}

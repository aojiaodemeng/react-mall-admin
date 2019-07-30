import { fromJS } from 'immutable';
import * as constants from './constants.jsx';
const defaultState = fromJS({
	userList: []
});
export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.GET_USER_LIST:
			return state.set('userList', action.value);
		default:
			return state;
	}
}

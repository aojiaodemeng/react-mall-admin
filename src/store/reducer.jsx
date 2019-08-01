import { combineReducers } from 'redux-immutable';
import loginReducer from 'page/login/store/reducer.jsx';
import mallAdmin_user from 'page/mallAdmin/user/store/reducer.jsx';
import mallAdmin_order from 'page/mallAdmin/order/store/reducer.jsx';
const reducer = combineReducers({
    login:loginReducer,
    user:mallAdmin_user,
    order:mallAdmin_order,
});
export default reducer;

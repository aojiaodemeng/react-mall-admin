import { combineReducers } from 'redux-immutable';
import loginReducer from 'page/login/store/reducer.jsx';
import mallAdmin_user from 'page/mallAdmin/user/store/reducer.jsx';
const reducer = combineReducers({
    login:loginReducer,
    user:mallAdmin_user
});
export default reducer;

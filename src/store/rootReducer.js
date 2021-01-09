import { combineReducers } from 'redux'

import auth from './modules/auth/reducer';
//import user from './user/reducer';

export default combineReducers({
	auth,
})

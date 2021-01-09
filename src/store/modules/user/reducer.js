import produce from 'immer';

const INITIAL_STATE = {
	profile: null,
	provider: null,
};

export default function user(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@auth/SIGN_IN_SUCCESS': {
				draft.profile = action.payload.user;
				break;
			}
			case '@user/GET_USER_SUCCESS': {
				console.log(action.payload)
				draft.provider = action.payload.provider;
				break;
			}
			case '@user/CREATE_USER_SUCCESS': {
				draft.provider = action.payload.provider;
				break;
			}
			case '@user/UPDATE_USER_SUCCESS': {
				draft.provider = action.payload.provider;
				break;
			}
			case '@user/DELETE_USER_SUCCESS': {
				draft.provider = action.payload.provider;
				break;
			}
			case '@user/UPDATE_PROFILE_SUCCESS': {
				draft.profile = action.payload.profile;
				break;
			}
			case '@auth/SIGN_OUT': {
				draft.profile = null;
				break;
			}
			default:
		}
	});
}

import produce from 'immer';

const INITIAL_STATE = {
	unavaliable: null,
};

export default function user(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@auth/SIGN_IN_SUCCESS': {
				draft.unavaliable = action.payload.data;
				break;
			}
			case '@user/CREATE_UNAVALIABLE_SUCCESS': {
				draft.unavaliable = action.payload.unavaliable;
				break;
			}
			case '@auth/SIGN_OUT': {
				draft.unavaliable = null;
				break;
			}
			default:
		}
	});
}

export function createUnavaliableRequest(data) {
	return {
		type: '@user/CREATE_UNAVALIABLE_REQUEST',
		payload: { data },
	};
}

export function createUnavaliableSuccess(data) {
	return {
		type: '@user/CREATE_UNAVALIABLE_SUCCESS',
		payload: { data },
	};
}

export function createUnavaliableFailure() {
	return {
		type: '@user/CREATE_UNAVALIABLE_FAILURE',
	};
}

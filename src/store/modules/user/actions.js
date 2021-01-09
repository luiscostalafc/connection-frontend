export function updateProfileRequest(data) {
	return {
		type: '@user/UPDATE_PROFILE_REQUEST',
		payload: { data },
	};
}

export function updateProfileSuccess(profile) {
	return {
		type: '@user/UPDATE_PROFILE_SUCCESS',
		payload: { profile },
	};
}

export function updateProfileFailure() {
	return {
		type: '@user/UPDATE_PROFILE_FAILURE',
	};
}
// get
export function getUserRequest(id) {
	return {
		type: '@user/GET_USER_REQUEST',
		payload: { id },
	};
}

export function getUserSuccess(provider) {
	return {
		type: '@user/GET_USER_SUCCESS',
		payload: { provider },
	};
}

export function getUserFailure() {
	return {
		type: '@user/GET_USER_FAILURE',
	};
}

// create
export function createUserRequest(provider) {
	return {
		type: '@user/CREATE_USER_REQUEST',
		payload: { provider },
	};
}

export function createUserSuccess(provider) {
	return {
		type: '@user/CREATE_USER_SUCCESS',
		payload: { provider },
	};
}

export function createUserFailure() {
	return {
		type: '@user/CREATE_USER_FAILURE',
	};
}

// update
export function updateUserRequest(provider) {
	return {
		type: '@user/UPDATE_USER_REQUEST',
		payload: { provider },
	};
}

export function updateUserSuccess(provider) {
	return {
		type: '@user/UPDATE_USER_SUCCESS',
		payload: { provider },
	};
}

export function updateUserFailure() {
	return {
		type: '@user/UPDATE_USER_FAILURE',
	};
}

// delete
export function deleteUserRequest(provider) {
	return {
		type: '@user/DELETE_USER_REQUEST',
		payload: { provider },
	};
}

export function deleteUserSuccess(provider) {
	return {
		type: '@user/DELETE_USER_SUCCESS',
		payload: { provider },
	};
}

export function deleteUserFailure() {
	return {
		type: '@user/DELETE_USER_FAILURE',
	};
}

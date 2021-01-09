import produce from 'immer'

const INITIAL_STATE = {
  category: null
}

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user
        break
      }
      case '@user/GET_CATEGORY_SUCCESS': {
        console.log(action.payload)
        draft.category = action.payload.category
        break
      }
      case '@user/CREATE_CATEGORY_SUCCESS': {
        draft.category = action.payload.category
        break
      }
      case '@user/UPDATE_CATEGORY_SUCCESS': {
        draft.category = action.payload.category
        break
      }
      case '@user/DELETE_CATEGORY_SUCCESS': {
        draft.category = action.payload.category
        break
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile
        break
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null
        break
      }
      default:
    }
  })
}

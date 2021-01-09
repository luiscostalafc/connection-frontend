// get
export function getCategoryRequest(id) {
  return {
    type: '@user/GET_CATEGORY_REQUEST',
    payload: { id }
  }
}

export function getCategorySuccess(category) {
  return {
    type: '@user/GET_CATEGORY_SUCCESS',
    payload: { category }
  }
}

export function getCategoryFailure() {
  return {
    type: '@user/GET_CATEGORY_FAILURE'
  }
}

// create
export function createCategoryRequest(category) {
  return {
    type: '@user/CREATE_CATEGORY_REQUEST',
    payload: { category }
  }
}

export function createCategorySuccess(category) {
  return {
    type: '@user/CREATE_CATEGORY_SUCCESS',
    payload: { category }
  }
}

export function createCategoryFailure() {
  return {
    type: '@user/CREATE_CATEGORY_FAILURE'
  }
}

// update
export function updateCategoryRequest(category) {
  return {
    type: '@user/UPDATE_CATEGORY_REQUEST',
    payload: { category }
  }
}

export function updateCategorySuccess(category) {
  return {
    type: '@user/UPDATE_CATEGORY_SUCCESS',
    payload: { category }
  }
}

export function updateCategoryFailure() {
  return {
    type: '@user/UPDATE_CATEGORY_FAILURE'
  }
}

// delete
export function deleteCategoryRequest(category) {
  return {
    type: '@user/DELETE_CATEGORY_REQUEST',
    payload: { category }
  }
}

export function deleteCategorySuccess(category) {
  return {
    type: '@user/DELETE_CATEGORY_SUCCESS',
    payload: { category }
  }
}

export function deleteCategoryFailure() {
  return {
    type: '@user/DELETE_CATEGORY_FAILURE'
  }
}

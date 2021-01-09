import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import api from '../../../services/api'

import {
  getCategorySuccess,
  getCategoryFailure,
  createCategorySuccess,
  createCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure
} from './actions'

export function* getCategory({ payload }) {
  try {
    const response = yield call(api.get, `categories/${payload.id}`)
    yield put(getCategorySuccess(response.data))
  } catch (err) {
    yield put(getCategoryFailure())
  }
}

export function* createCategory({ payload }) {
  try {
    const { name, gender, price } = payload.category
    const data = { name, gender, price }
    const response = yield call(api.post, 'categories', data)

    toast.success('Categoria inserida com sucesso!')

    yield put(createCategorySuccess(response.data))
  } catch (err) {
    toast.error('Erro ao inserir Categoria!')
    yield put(createCategoryFailure())
  }
}

export function* updateCategory({ payload }) {
  try {
    const { id, name, gender, price } = payload.category
    const data = { name, gender, price }
    const response = yield call(api.put, `categories/${id}`, data)

    toast.success('Categoria atualizado com sucesso!')

    yield put(updateCategorySuccess(response.data))
  } catch (err) {
    toast.error('Erro ao atualizar Categoria!')
    yield put(updateCategoryFailure())
  }
}

export function* deleteCategory({ payload }) {
  try {
    const response = yield call(api.delete, `categories/${payload.id}`)

    toast.success('Categoria apagado com sucesso!')

    yield put(deleteCategorySuccess(response.data))
  } catch (err) {
    toast.error('Erro ao apagar Categoria!')
    yield put(deleteCategoryFailure())
  }
}

export default all([
  takeLatest('@user/GET_CATEGORY_REQUEST', getCategory),
  takeLatest('@user/CREATE_CATEGORY_REQUEST', createCategory),
  takeLatest('@user/UPDATE_CATEGORY_REQUEST', updateCategory),
  takeLatest('@user/DELETE_CATEGORY_REQUEST', deleteCategory)
])

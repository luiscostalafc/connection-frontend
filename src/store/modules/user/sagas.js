import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import api from '../../../services/api'

import {
  updateProfileSuccess,
  updateProfileFailure,
  getUserSuccess,
  getUserFailure,
  createUserSuccess,
  createUserFailure,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserFailure
} from './actions'

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, id, ...rest } = payload.data

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {})
    }

    const response = yield call(api.put, `users/${id}`, profile)

    toast.success('Perfil atualizado com sucesso!')

    yield put(updateProfileSuccess(response.data))
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!')
    yield put(updateProfileFailure())
  }
}

export function* getUser({ payload }) {
  console.log(payload)
  try {
    const response = yield call(api.get, `users/${payload.id}`)
    console.log(response.data)
    yield put(getUserSuccess(response.data))
  } catch (err) {
    yield put(getUserFailure())
  }
}

export function* createUser({ payload }) {
  try {
    const { name, email, phone, password } = payload.provider
    const userData = { name, email, phone, password, provider: true }
    const response = yield call(api.post, 'users', userData)

    toast.success('Usuário inserido com sucesso!')

    yield put(createUserSuccess(response.data))
  } catch (err) {
    toast.error('Erro ao inserir usuário!')
    yield put(createUserFailure())
  }
}

export function* updateUser({ payload }) {
  try {
    const { id, name, email, phone, password } = payload.provider
    const userData = { name, email, phone, password }
    const response = yield call(api.put, `users/${id}`, userData)

    toast.success('Usuário atualizado com sucesso!')

    yield put(updateUserSuccess(response.data))
  } catch (err) {
    toast.error('Erro ao atualizar usuário!')
    yield put(updateUserFailure())
  }
}

export function* deleteUser({ payload }) {
  try {
    const response = yield call(api.delete, `users/${payload.id}`)

    toast.success('Usuário apagado com sucesso!')

    yield put(deleteUserSuccess(response.data))
  } catch (err) {
    toast.error('Erro ao apagar usuário!')
    yield put(deleteUserFailure())
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/GET_USER_REQUEST', getUser),
  takeLatest('@user/CREATE_USER_REQUEST', createUser),
  takeLatest('@user/UPDATE_USER_REQUEST', updateUser),
  takeLatest('@user/DELETE_USER_REQUEST', deleteUser)
])

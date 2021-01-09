import { takeLatest, call, put, all } from 'redux-saga/effects'
import { toast } from 'react-toastify'

import api from '../../../services/api'

import { createUnavaliableSuccess, createUnavaliableFailure } from './actions'

export function* createUnavaliable({ payload }) {
  try {
    const unavaliable = payload.data

    const response = yield call(
      api.post,
      'appointments/unavailable',
      unavaliable
    )

    toast.success('Perfil atualizado com sucesso!')

    yield put(createUnavaliableSuccess(response.data))
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!')
    yield put(createUnavaliableFailure())
  }
}

export default all([
  takeLatest('@user/CREATE_UNAVALIABLE_REQUEST', createUnavaliable)
])

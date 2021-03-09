import axios from 'axios'

import { getUrl } from 'helpers'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const LOGOUT = 'LOGOUT'

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  }
}

export const loginSuccess = (token) => {
  const data = { token, timestamp: Date.now() }
  localStorage.setItem('token', JSON.stringify(data))

  return {
    type: LOGIN_SUCCESS,
    payload: data,
  }
}

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token')

  dispatch({ type: LOGOUT })
}

export const authentication = ({ username, password }) => (dispatch) => {
  const request = loginRequest()
  dispatch(request)

  const url = getUrl('login')

  const preparedData = new FormData()
  preparedData.append('username', username)
  preparedData.append('password', password)

  return axios
    .post(url, preparedData)
    .then((response) => {
      if (response.data.status === 'ok') {
        const success = loginSuccess(response.data.message.token)
        dispatch(success)
      }

      if (response.data.status === 'error') {
        const error = loginError(response.data.message)
        dispatch(error)
      }

      return response
    })
    .catch((data) => {
      const error = loginError(data)
      dispatch(error)
    })
}

import axios from 'axios'

import { getToken, getUrl } from 'helpers'

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST'
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS'
export const GET_TASKS_ERROR = 'GET_TASKS_ERROR'

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST'
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS'
export const CREATE_TASK_ERROR = 'CREATE_TASK_ERROR'

export const EDIT_TASK_REQUEST = 'EDIT_TASK_REQUEST'
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS'
export const EDIT_TASK_ERROR = 'EDIT_TASK_ERROR'

export const TOGGLE_TASK_STATUS = 'TOGGLE_TASK_STATUS'

const getTasksRequest = () => {
  return {
    type: GET_TASKS_REQUEST,
  }
}

const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data,
  }
}

const getTasksError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error,
  }
}

const createTaskRequest = () => {
  return {
    type: CREATE_TASK_REQUEST,
  }
}

const createTaskSuccess = (data) => {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: data,
  }
}

const createTaskError = (error) => {
  return {
    type: CREATE_TASK_ERROR,
    payload: error,
  }
}

const editTaskRequest = () => {
  return {
    type: EDIT_TASK_REQUEST,
  }
}

const editTaskSuccess = (data) => {
  return {
    type: EDIT_TASK_SUCCESS,
    payload: data,
  }
}

const editTaskError = (error) => {
  return {
    type: EDIT_TASK_ERROR,
    payload: error,
  }
}

const toggleTaskStatus = (data) => {
  return {
    type: TOGGLE_TASK_STATUS,
    payload: data,
  }
}

export const getTasks = (page = 1) => (dispatch) => {
  const request = getTasksRequest()
  dispatch(request)

  const url = getUrl('', page)

  axios
    .get(url)
    .then((response) => {
      const success = getTasksSuccess(response.data)
      dispatch(success)
    })
    .catch((data) => {
      const error = getTasksError(data)
      dispatch(error)
    })
}

export const createTask = (data) => (dispatch) => {
  const request = createTaskRequest()

  dispatch(request)

  const url = getUrl('create')

  const preparedData = new FormData()
  preparedData.append('username', data.username)
  preparedData.append('email', data.email)
  preparedData.append('text', data.text)

  return axios
    .post(url, preparedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.data.status === 'ok') {
        const success = createTaskSuccess(response.data)
        dispatch(success)
      }

      if (response.data.status === 'error') {
        const error = createTaskError(response.data)
        dispatch(error)
      }

      return response
    })
    .catch((data) => {
      const error = createTaskError(data)
      dispatch(error)
    })
}

const getNextStatusToggle = (prevStatus) => {
  if (prevStatus === 0) return 10
  if (prevStatus === 10) return 0
  if (prevStatus === 11) return 1
  if (prevStatus === 1) return 11
}

export const handleToggleTaskStatus = (data) => (dispatch) => {
  const url = getUrl(`edit/${data.id}`)

  const preparedData = new FormData()
  preparedData.append('username', data.username)
  preparedData.append('email', data.email)
  preparedData.append('text', data.text)

  const status = getNextStatusToggle(data.status)
  preparedData.append('status', status)

  const { token } = getToken()
  preparedData.append('token', token)

  return axios
    .post(url, preparedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.data.status === 'ok') {
        const updatedData = { ...data, status }
        const success = toggleTaskStatus(updatedData)

        dispatch(success)
      }
    })
}

const getNextStatusEdit = (status) => {
  if (status === 0) return 1
  if (status === 10) return 11

  return status
}

export const handleEditTask = (data) => (dispatch) => {
  const request = editTaskRequest()
  dispatch(request)

  const url = getUrl(`edit/${data.id}`)

  const preparedData = new FormData()
  preparedData.append('username', data.username)
  preparedData.append('email', data.email)
  preparedData.append('text', data.text)

  const status = getNextStatusEdit(data.status)
  preparedData.append('status', status)

  const { token } = getToken()
  preparedData.append('token', token)

  return axios
    .post(url, preparedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.data.status === 'ok') {
        const updatedData = { ...data, status }
        const success = editTaskSuccess(updatedData)

        dispatch(success)
      }

      if (response.data.status === 'error') {
        const error = editTaskError(response.data)
        dispatch(error)
      }

      return response
    })
}

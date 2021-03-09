import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  EDIT_TASK_REQUEST,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  TOGGLE_TASK_STATUS,
} from './actions'

const initialState = {
  loading: false,
  loaded: false,
  error: {},
  data: [],
  count: 0,

  craeteLoading: false,
  createLoaded: false,
  createError: {},
  createData: {},

  editLoading: false,
  editLoaded: false,
  editError: {},
  editData: {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return { ...state, loading: true, loaded: false, error: '' }

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
        data: action.payload.message.tasks,
        count: Number(action.payload.message.total_task_count),
      }

    case GET_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.message,
      }

    case CREATE_TASK_REQUEST:
      return {
        ...state,
        createLoading: true,
        createLoaded: false,
        createError: '',
      }

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createLoaded: true,
        createError: '',
        createData: action.payload,
      }

    case CREATE_TASK_ERROR:
      return {
        ...state,
        createLoading: false,
        createLoaded: false,
        createError: action.payload.message,
      }

    case EDIT_TASK_REQUEST:
      return {
        ...state,
        editLoading: true,
        editLoaded: false,
        editError: '',
      }

    case EDIT_TASK_SUCCESS:
      const editedData = state.data.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload
        }

        return task
      })

      return {
        ...state,
        editLoading: false,
        editLoaded: true,
        editError: '',
        data: editedData,
      }

    case EDIT_TASK_ERROR:
      return {
        ...state,
        createLoading: false,
        createLoaded: false,
        createError: action.payload.message,
      }

    case TOGGLE_TASK_STATUS:
      const toggledData = state.data.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload
        }

        return task
      })

      return { ...state, data: toggledData }

    default:
      return state
  }
}

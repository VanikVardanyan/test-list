import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT } from './actions'

const initialState = {
  loading: false,
  loaded: false,
  error: '',
  data: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : {},
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, loaded: false, error: '' }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
        data: action.payload,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      }

    case LOGOUT:
      return {
        loading: false,
        loaded: false,
        error: '',
        data: {},
      }

    default:
      return state
  }
}

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { reducer as task } from 'slices/table/reducer'
import { reducer as auth } from 'slices/auth/reducer'

const reducer = combineReducers({ task, auth })

export const store = createStore(reducer, applyMiddleware(thunk))


import {handleActions} from 'redux-actions'
import * as T from './actionTypes'
const initialState = {
  loading: true,
  error: false,
  items: []
}
const questions = handleActions({
  [T.GET_LIST]: {
    next(state, action) {
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.data]
      }
    }
  },
  [T.GET_DETAIL]: {
    next(state, action) {
      return {
        ...state,
        loading: false,
        detail: action.payload.data
      }
    }
  },
  [T.FRESH]: {
    next(state, action) {
      return initialState
    }
  }
}, initialState)

export {
  questions
}

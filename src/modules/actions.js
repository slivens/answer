import axios from 'axios'
import {createAction} from 'redux-actions'
import * as T from './actionTypes'

const getList = createAction(T.GET_LIST, (pageIndex = 1, name) => {
  let url = `/api/v0.1/questions?_page=${pageIndex}&_sort=timestamp&_order=desc&_limit=10`
  if (name) url += `&author=${name}`
  return axios.get(url)
})
const getDetail = createAction(T.GET_DETAIL, (id) => {
  return axios.get(`/api/v0.1/questions/${id}?_t=${new Date().getTime()}`)
})
const fresh = createAction(T.FRESH)
export {
  getList,
  getDetail,
  fresh
}

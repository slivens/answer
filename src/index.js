import 'theme/styles/app.css'
import 'theme/styles/app.scss'
import 'antd-mobile/dist/antd-mobile.css'
// IE9，10兼容性：https://reactjs.org/docs/javascript-environment-requirements.html
// 下面三行必须置顶
import 'core-js/fn/map'
import 'core-js/fn/set'
import 'raf/polyfill'
import {changeToRem} from './changeToRem'
// Object.setPrototypeOf = require('setprototypeof')
if (typeof global.Promise === 'undefined') {
  require('es6-promise/auto')
}
// api地址配置，及一些根据环境配置的常量
window.__config = process.env.__CONFIG
const React = require('react')
if (!React.PropTypes) {
  React.PropTypes = require('prop-types')
}
if (!React.createClass) {
  React.createClass = require('create-react-class')
}
const render = require('react-dom').render
const Provider = require('react-redux').Provider
// 使用babel-plugin-transform-runtime不能完全代替babel-polyfill
// IE11 兼容性： https://github.com/facebook/react/issues/8449#issuecomment-264867322
// 下面一行必须放在react库之后
require('babel-polyfill')
const syncHistoryWithStore = require('react-router-redux/lib/sync').default
const configureStore = require('./store/configureStore')
const routes = require('./routes')
const routerHistory = require('react-router').useRouterHistory
const createHistory = require('history').createHashHistory
const store = configureStore()
// 移除react-router自动添加的_k=xxx参数
const hashHistory = routerHistory(createHistory)({queryKey: false})
const history = syncHistoryWithStore(hashHistory, store)
changeToRem(window, {
  designWidth: 375,
  designHeight: 667,
  designFontSize: 100,
  callback: function (argument) {
    console.timeEnd('test')
  }
})
render((
  <Provider store={store}>
    {routes(history)}
  </Provider>
), document.getElementById('app'))

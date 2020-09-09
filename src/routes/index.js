import React from 'react'
import {Router, Route} from 'react-router'
import Intl from 'i18n/intl'

const Home = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/home'))
  }, 'Home')
}
const ExampleDetail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/detail'))
  }, 'ExampleDetail')
}
const ExampleArticleAdd = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('modules/add'))
  }, 'ExampleArticleAdd')
}

const routes = history => (
  <Router history={history}>
    <Route component={Intl}>
      <Route path="/" getComponent={Home} />
      <Route path="/detail/:id" getComponent={ExampleDetail} />
      <Route path="/add" getComponent={ExampleArticleAdd} />
    </Route>
  </Router>
)

export default routes

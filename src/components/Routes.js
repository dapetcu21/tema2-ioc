import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'

import NavBarPage from './NavBarPage'
import NotFoundPage from './NotFoundPage'
import RootPage from './RootPage'

export default class Routes extends Component {
  render () {
    return <Router history={browserHistory}>
      <Route component={NavBarPage}>
        <Route path='/' component={RootPage} />
        <Route path='*' component={NotFoundPage} />
      </Route>
    </Router>
  }
}

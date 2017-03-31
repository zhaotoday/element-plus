import React from 'react'
import routes from './routes'
import store from './redux/store'
import { render } from 'react-dom'
import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'
import Provider from 'react-redux/lib/components/Provider'

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)

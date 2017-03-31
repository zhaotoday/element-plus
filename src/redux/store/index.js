import createStore from 'redux/lib/createStore'
import applyMiddleware from 'redux/lib/applyMiddleware'
import reducers from '../reducers'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'

const store = createStore(reducers, {}, applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
  })
))

export default store

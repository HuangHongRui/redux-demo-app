import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import { Provider } from './react-redux'

const createStore = (reducer) => {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({})
  return { subscribe, getState, dispatch }
}

const themeReducer = (state, action) => {
  if(!state) return {
    themeColor : 'red'
  }
  switch (action.type) {
    case 'CHANGE_COLOR':
      return {
        ...state,
        themeColor : action.themeColor
      }
    default:
      return state
  }
}

const store = createStore(themeReducer)

class Index extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Content/>
      </div>
    )
  }
}

ReactDOM.render(
  //将状态提升至最顶根目录
  <Provider store = {store}>
    <Index/>
  </Provider>,
  document.getElementById('root')
)


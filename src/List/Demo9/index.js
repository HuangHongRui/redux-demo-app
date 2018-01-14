import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Header from './Header'
import Content from './Content'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

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


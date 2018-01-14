import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import {connect} from './react-redux'

class Content extends Component{
  static propTypes = {
    store : PropTypes.string
  }
  //constructor() {
  //  super()
  //  this.state = {
  //    themeColor : ''
  //  }
  //}
  //componentWillMount() {
  //  let { store } = this.context
  //  this._updateThemeColor()
  //  store.subscribe(() => this._updateThemeColor())
  //}
  //_updateThemeColor() {
  //  let { store } = this.context
  //  const state = store.getState()
  //  this.setState({
  //    themeColor : state.themeColor
  //  })
  //}
  render(){
    return (
      <div>
        <h1 style = {{ color : this.props.themeColor }}>Content</h1>
        <ThemeSwitch/>
      </div>
    )
  }
}
  const mapStateToProps = (state) => {
    return {
      themeColor : state.themeColor
    }  
  }
  Content = connect(mapStateToProps)(Content)

export default Content

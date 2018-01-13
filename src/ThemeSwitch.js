import React,{ Component } from 'react'
import PropTypes from 'prop-types'

class ThemeSwitch extends Component{
  static contextTypes = {
    store : PropTypes.object
  }
  constructor() {
    super()
    this.state = {
      themeColor : ''
    }
  }
  componentWillMount() {
    let { store } = this.context
    this._updateThemeColor()
    store.subscribe(() => this._updateThemeColor())
  }
  _updateThemeColor() {
    let { store } = this.context
    const state = store.getState()
    this.setState({
      themeColor: state.themeColor
    })
  }
  handleSwitchColor(color) {
    let { store } = this.context
    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    }) 
  }
  render(){
    return (
      <div>
        <button onClick={ this.handleSwitchColor.bind(this,'yellow')} style={{ color : this.state.themeColor}}>YELLOW</button>
        <button onClick={ this.handleSwitchColor.bind(this,'blue')} style={{ color : this.state.themeColor}}>RED</button>
      </div>
    )
  }
}

export default ThemeSwitch

import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ThemeSwitch extends Component{
  static propTypes = {
    store : PropTypes.string,
    onSwitchCoolor : PropTypes.func
  }
  handleSwitchColor(color) {
    if(this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }
  render(){
    return (
      <div>
        <button
          onClick={ this.handleSwitchColor.bind(this,'yellow')}
          style={{ color : this.props.themeColor}}>
          YELLOW
        </button>
      <button
        onClick={ this.handleSwitchColor.bind(this,'blue')}
        style={{ color : this.props.themeColor}}>
        RED
      </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor : state.themeColor
  }
}
const mapDispatchProps = (dispatch) => {
  return {
    onSwitchColor : (color) => {
      dispatch({type: 'CHANGE_COLOR', themeColor: color})
    }
  }
}

ThemeSwitch = connect(mapStateToProps, mapDispatchProps)(ThemeSwitch)

export default ThemeSwitch

import React from 'react'
import './i18n'

export default class extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

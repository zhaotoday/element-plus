import React from 'react'
import styles from './theme/styles'

export default class extends React.Component {
  render() {
    return <div className={styles.body}>
      {this.props.children}
    </div>
  }
}

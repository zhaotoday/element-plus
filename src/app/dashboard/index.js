import React from 'react'
import styles from './theme/styles'

export default class extends React.Component {
  render() {
    return <div>
      <div className={styles['img-bg']} />
      <div className={styles.text}>dashboard</div>
    </div>
  }
}

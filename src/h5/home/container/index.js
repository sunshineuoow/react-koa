import React, { Component } from 'react'
import Header from '../../../common/components/Header'
import './index.less'


export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 0
    }
  }

  render() {
    return (
      <div>
        <Header/>
      </div>
    )
  }
}

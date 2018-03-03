import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class HelloWorld extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
        <div>111</div>
    )
  }
}

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('container')
)

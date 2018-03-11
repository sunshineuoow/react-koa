import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

const axiosInstance = Axios.create()

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_info: {}
    }
  }

  componentWillMount() {
    axiosInstance.get('/api/user').then(data => {this.setState({user_info: data})})
  }

  render() {
    const {name, phone} = this.state.user_info
    return (
      <div>
        <h4>{name}</h4>
        <p>{phone}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <HomePage />,
  document.getElementById('container')
)

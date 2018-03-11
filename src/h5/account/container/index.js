import React, {Component} from 'react'
import LoginForm from '../components/login_form/_index'
import RegisterForm from '../components/register_form/_index'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login_form: true
    }
  }

  renderLoginForm() {
    return (
      <div>
        <LoginForm />
        <div className="toggle-btn">
          <a onClick={() => {this.setState({login_form: false})}}>没有账号？立即注册</a>
        </div>
      </div>
    )
  }

  renderRegisterForm() {
    return (
      <div>
        <RegisterForm />
        <div className="toggle-btn">
          <a onClick={() => {this.setState({login_form: true})}}>已有账号？立即登录</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      this.state.login_form ? this.renderLoginForm() : this.renderRegisterForm()
    )
  }
}

export default <AccountForm />

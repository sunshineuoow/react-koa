import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { login } from '../../service'


const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        login(values).then(() => {
          window.location.href = '/h5/index'
        })
      }
    })
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Username"

        >
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: 'Please input your phone number!' }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Login</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create()(LoginForm)

export default WrappedLoginForm

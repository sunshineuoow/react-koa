import React, { Component } from 'react'
import { Form, Input, Tooltip, Icon, Button } from 'antd'
import { register } from '../../service'

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

class RegisterForm extends Component {
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
        register(values).then(() => {
          window.location.href = '/h5/index'
        })
      }
    })
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields([ 'confirm' ], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={
            (<span>
               Username&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>)
          }
        >
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: 'Please input your username!', whitespace: true }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your password!' },
              { validator: this.checkConfirm }
            ]
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please confirm your password!' },
              { validator: this.checkPassword }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'The input is not valid E-mail!' },
              { required: true, message: 'Please input your E-mail!' }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedRegisterForm = Form.create()(RegisterForm)

export default WrappedRegisterForm

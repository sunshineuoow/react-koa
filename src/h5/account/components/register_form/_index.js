import React, {Component} from 'react'
import {Form, Input, Tooltip, Icon, Select, Button} from 'antd'
import {register} from '../../service/_index'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 12}
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

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        register(values).then(data => {
          window.location.href = '/h5/index'
        })
      }
    })
  }

  handleConfirmBlur(e) {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true})
    }
    callback()
  }

  render() {
    const {getFieldDecorator} = this.props.form

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86'
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    )

    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [
              {type: 'email', message: 'The input is not valid E-mail!'},
              {required: true, message: 'Please input your E-mail!'}
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [
              {required: true, message: 'Please input your password!'},
              {validator: this.checkConfirm.bind(this)}
            ]
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [
              {required: true, message: 'Please confirm your password!'},
              {validator: this.checkPassword.bind(this)}
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            (<span>
               Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>)
          }
        >
          {getFieldDecorator('nickname', {
            rules: [
              {required: true, message: 'Please input your nickname!', whitespace: true}
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"

        >
          {getFieldDecorator('phone', {
            rules: [
              {required: true, message: 'Please input your phone number!'}
            ]
          })(<Input addonBefore={prefixSelector} style={{width: '100%'}} />)}
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

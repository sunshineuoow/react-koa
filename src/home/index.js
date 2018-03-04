import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';

const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8}
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16}
  }
}

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: []
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {autoCompleteResult} = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
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
      </Form>
    )
  }
}

const WrappedRegisterForm = Form.create()(RegisterForm);

ReactDOM.render(
  <WrappedRegisterForm/>,
  document.getElementById('container')
)

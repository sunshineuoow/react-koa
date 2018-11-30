import React, { Component } from 'react'
import { getUserInfo } from '../service'
import { Layout, Menu, Breadcrumb } from 'antd'
import './index.less'

const { Header, Content, Footer } = Layout

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 0
    }
  }

  componentDidMount() {
    getUserInfo().then(data => this.setState({ data }))
  }

  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[ '2' ]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">关注</Menu.Item>
              <Menu.Item key="3">社区</Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
          </Content>
          <Footer>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    )
  }
}

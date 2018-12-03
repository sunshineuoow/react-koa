import React from 'react'
import './index.less'

const Header = () => (
  <header>
    <div className="logo">MicroBlog</div>
    <div className="menu">
      <div className="menu-item">Home</div>
      <div className="menu-item">Explore</div>
      <div className="menu-item float-right"><a href="/h5/account">Login</a></div>
    </div>
  </header>
)

export default Header

const User = require('../model/User')
const { createToken } = require('../utils/token')
const sha1 = require('sha1')

class UserController {
  async getUser(account) {
    return await User.findUser(account)
  }

  async signUp(data) {
    const result = await this.getUser(data.phone)
    const user = result[0]
    if (user) {
      return { r: false, msg: '该用户已注册', code: 1 }
    } else {
      await User.addUser([data.nickname, sha1(data.password), data.phone, data.email])
      return { r: true, token: createToken(data) }
    }
  }

  async signIn(values) {
    const result = await this.getUser(values.account)
    const user = result[0]
    if (user) {
      if (user.pass === sha1(values.password)) {
        return { r: true, token: createToken(user) }
      } else {
        return { r: false, msg: '密码错误', code: 3 }
      }
    } else {
      return { r: false, msg: '用户未注册', code: 2 }
    }
  }
}

module.exports = new UserController()

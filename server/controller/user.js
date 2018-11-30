const User = require('../model/User')
const Error = require('./error')
const sha1 = require('sha1')

class UserController {

  static async signUp(data) {
    const user = await User.findOne({ where: { username: data.username } })
    if (user) return Error.existUser

    const params = { username: data.username, password: sha1(data.password), email: data.email }
    await User.create(params)
    return Error.ok
  }

  static async signIn(values) {
    const user = await User.findOne({ where: { username: values.username } })
    if (!user) return Error.noUser

    if (user.password !== sha1(values.password)) return Error.wrongPassword

    return Error.ok
  }
}

module.exports = UserController

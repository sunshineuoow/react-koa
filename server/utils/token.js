const jwt = require('jsonwebtoken')
const config = require('../config')

const getToken = (ctx) => {
  return ctx.cookies.get('_gt')
}

const createToken = (user) => {
  let opts = {
    phone: user.phone,
    name: user.nickname
  }
  return jwt.sign(opts, config.secret, {expiresIn: '24h'})
}

module.exports = {
  createToken,
  getToken
}

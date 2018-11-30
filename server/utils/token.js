const jwt = require('jsonwebtoken')
const config = require('../config')

const getToken = ctx => {
  return ctx.cookies.get('_gt')
}

const createToken = (user) => {
  const opts = { name: user.username }
  return jwt.sign(opts, config.secret, {expiresIn: '48h'})
}

module.exports = {
  createToken,
  getToken
}

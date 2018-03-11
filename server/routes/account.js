const User = require('../model/User')
const sha1 = require('sha1')
const {createToken} = require('../utils/token')
const {renderToString} = require('react-dom/server')
const LoginPage = require('../../static/webpack/server/h5/account/container/index').default

const account = (router) => {
  router.get('/h5/account/index', async (ctx, next) => {
    await ctx.render('account/index', {
      root: renderToString(LoginPage)
    })
  })

  router.get('/api/user', async (ctx, next) => {
    let data = await User.findOneByPhone(ctx.state.user.phone)
    ctx.body = {r: true, data: data}
  })

  router.post('/api/account/login', async (ctx, next) => {
    let userData = ctx.request.body
    let user = await User.findOneByPhone(userData.account)
    if (user) {
      if (user.password === sha1(userData.password)) {
        const token = createToken(user)
        ctx.cookies.set('_gt', token)
        ctx.body = {r: true}
      } else {
        ctx.body = {r: false, msg: '密码错误', code: 3}
      }
    } else {
      ctx.body = {r: false, msg: '用户未注册', code: 2}
    }
  })

  router.post('/api/account/register', async (ctx, next) => {
    let userData = ctx.request.body
    let user = await User.findOneByPhone(userData.phone)

    if (!user) {
      userData.password = sha1(userData.password)
      const token = createToken(userData)
      ctx.cookies.set('_gt', token)
      await User.signup(userData).then(data => {
        user = data
      })
      ctx.body = {r: true}
    } else {
      ctx.body = {r: false, msg: '该用户已注册', code: 1}
    }

  })
}

module.exports = account

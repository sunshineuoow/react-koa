const UserController = require('../controller/user')
const getComponent = require('../utils/get_component')
const { createToken } = require('../utils/token')
const Error = require('../controller/error')

const account = router => {

  router.get('/h5/account', async ctx => {
    const root = await getComponent('account')
    await ctx.render('account', { root })
  })


  router.get('/api/user', async ctx => {
    ctx.body = { r: true, data: 111 }
  })


  router.post('/api/account/login', async ctx => {
    const userData = ctx.request.body
    const [code, msg] = await UserController.signIn(userData)
    if (code === Error.ok[0]) {
      ctx.cookies.set('_gt', createToken(userData), { singed: true, maxAge: 720000000 })
      ctx.body = { r: true }
    } else {
      ctx.body = { r: false, msg }
    }
  })


  router.get('/api/account/logout', async ctx => {
    ctx.cookies.set('_gt', '', { singed: true, maxAge: 0 })
    ctx.redirect('/h5/account/index')
  })


  router.post('/api/account/register', async ctx => {
    const userData = ctx.request.body
    const [code, msg] = await UserController.signUp(userData)
    if (code === Error.ok[0]) {
      ctx.cookies.set('_gt', createToken(userData), { singed: true, maxAge: 720000000 })
      ctx.body = { r: true }
    } else {
      ctx.body = { r: false, msg }
    }
  })

}

module.exports = account

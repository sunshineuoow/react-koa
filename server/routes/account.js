const UserController = require('../controller/user')
const getComponent = require('../utils/get_component')

const account = (router) => {
  router.get('/h5/account/index', async (ctx, next) => {
    const root = await getComponent('account')
    await ctx.render('account', {
      root
    })
  })

  router.get('/api/user', async (ctx, next) => {
    ctx.body = {r: true, data: 111}
  })

  router.post('/api/account/login', async (ctx, next) => {
    const userData = ctx.request.body
    const result = await UserController.signIn(userData)
    if (result.r) {
      ctx.cookies.set('_gt', result.token)
      ctx.body = { r: true }
    } else {
      ctx.body = result
    }
  })

  router.post('/api/account/register', async (ctx, next) => {
    const userData = ctx.request.body
    const result = await UserController.signUp(userData)
    if (result.r) {
      ctx.cookies.set('_gt', result.token)
      ctx.body = { r: true }
    } else {
      ctx.body = result
    }
  })
}

module.exports = account

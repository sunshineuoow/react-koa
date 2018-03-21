const getComponent = require('../utils/get_component')

const home = (router) => {
  router.get('/h5/index', async (ctx, next) => {
    const root = await getComponent('home')
    await ctx.render('home/index', {
      root
    })
  })
}

module.exports = home

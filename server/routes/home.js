const getComponent = require('../utils/get_component')

const home = (router) => {
  router.get('/', async (ctx, next) => {
    const root = await getComponent('home')
    await ctx.render('home', {
      root
    })
  })
}

module.exports = home
